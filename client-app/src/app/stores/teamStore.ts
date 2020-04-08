import {observable, action, computed, runInAction, reaction, toJS} from 'mobx';
import {ITeam} from '../models/team';
import agent from '../api/agent';
import {history} from '../..';
import {toast} from 'react-toastify';
import {RootStore} from './rootStore';
import {setTeamProps, createMember} from '../common/util/util';

/*
 * Store that contains state and properties related to teams
 */

// Limit for the amount of list objects that can show up per page 
const LIMIT = 9000;

export default class TeamStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        reaction(
            () => this.predicate.keys(),
            () => {
                this.page = 0;
                this.teamRegistry.clear();
                this.loadTeams();
            }
        )
    }

    @observable teamRegistry = new Map();
    @observable team: ITeam | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';
    @observable loading = false;
    @observable teamCount = 0;
    @observable page = 0;
    @observable predicate = new Map();

    @action setPredicate = (predicate: string, value: string) => {
        this.predicate.clear();
        if (predicate !== 'all') {
            this.predicate.set(predicate, value);
        }
    }

    @computed get axiosParams() {
        const params = new URLSearchParams();
        params.append('limit', String(LIMIT));
        params.append('offset', `${this.page ? this.page * LIMIT : 0}`);
        this.predicate.forEach((value, key) => {
            params.append(key, value);
        })
        return params;
    }

    @computed get totalPages() {
        return Math.ceil(this.teamCount / LIMIT);
    }

    @action setPage = (page: number) => {
        this.page = page;
    }

    @computed get teamsByName() {
        return this.groupTeamsByName(
            Array.from(this.teamRegistry.values())
        );
    }

    @computed get teams(){
        return Array.from(this.teamRegistry.values());
    }
    
    // sort the array by name, and create a dictionary of <name, team>
    groupTeamsByName(teams: ITeam[]) {
        const sortedTeams = teams.sort(
            (a, b) => a.name.localeCompare(b.name)
        );
        return Object.entries(
            sortedTeams.reduce(
                (teams, team) => {
                    const name = team.name;
                    teams[name] = teams[name]
                        ? [...teams[name], team]
                        : [team];
                    return teams;
                },
                {} as { [key: string]: ITeam[] }
            )
        );
    }
    
    @action loadTeams = async () => {
        this.loadingInitial = true;
        try {
            const teamsEnvelope = await agent.Teams.list(this.axiosParams);
            const {teams, teamCount} = teamsEnvelope;
            runInAction('loading teams', () => {
                teams.forEach((team:ITeam) => {
                    setTeamProps(team, this.rootStore.userStore.user!);
                    this.teamRegistry.set(team.id, team);
                });
                this.teamCount = teamCount;
                this.loadingInitial = false;
            });
        } catch (error) {
            runInAction('load teams error', () => {
                this.loadingInitial = false;
            });
        }
    };

    @action loadTeam = async (id: string) => {
        let team = this.getTeam(id);
        if (team) {
            this.team = team;
            return toJS(team);
        } else {
            this.loadingInitial = true;
            try {
                team = await agent.Teams.details(id);
                runInAction('getting team', () => {
                    setTeamProps(team, this.rootStore.userStore.user!);
                    this.team = team;
                    this.teamRegistry.set(team.id, team);
                    this.loadingInitial = false;
                });
                return team;
            } catch (error) {
                runInAction('get team error', () => {
                    this.loadingInitial = false;
                });
                console.log(error);
            }
        }
    };

    @action clearTeam = () => {
        this.team = null;
    };

    getTeam = (id: string) => {
        return this.teamRegistry.get(id);
    };

    @action createTeam = async (team: ITeam) => {
        this.submitting = true;
        try {
            await agent.Teams.create(team);
            const member = createMember(this.rootStore.userStore.user!);
            team.isManager = true;
            member.isManager = true;
            let members = [];
            members.push(member);
            team.members = members;
            runInAction('create team', () => {
                this.teamRegistry.set(team.id, team);
                this.submitting = false;
            });
            history.push(`/teams/${team.id}`);
        } catch (error) {
            runInAction('create team error', () => {
                this.submitting = false;
            });
            toast.error('Problem submitting data');
            console.log(error.response);
        }
    };

    @action editTeam= async (team: ITeam) => {
        this.submitting = true;
        try {
            await agent.Teams.update(team);
            runInAction('editing team', () => {
                this.teamRegistry.set(team.id, team);
                this.team = team;
                this.submitting = false;
            });
            history.push(`/teams/${team.id}`);
        } catch (error) {
            runInAction('edit team error', () => {
                this.submitting = false;
            });
            toast.error('Problem submitting data');
            console.log(error);
        }
    };

    @action deleteTeam = async (team: ITeam) => {
        this.submitting = true;
        try {
            await agent.Teams.delete(team.id);
            runInAction('deleting team', () => {
                this.teamRegistry.delete(team.id);
                this.submitting = false;
                this.target = '';
            });
            history.push(`/teams/`);
        } catch (error) {
            runInAction('delete team error', () => {
                this.submitting = false;
                this.target = '';
            });
            console.log(error);
        }
    };

    @action belongTeam = async () => {
        const member = createMember(this.rootStore.userStore.user!);
        this.loading = true;
        try {
            await agent.Teams.belong(this.team!.id);
            runInAction(() => {
                if (this.team) {
                    this.team.members.push(member);
                    this.team.isTeamMem = true;
                    this.teamRegistry.set(this.team.id, this.team);
                    this.loading = false;
                }
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
            toast.error('Problem signing up to team');
        }
    };

    @action unbelongTeam = async () => {
        this.loading = true;
        try {
            await agent.Teams.unbelong(this.team!.id);
            runInAction(() => {
                if (this.team) {
                    this.team.members = this.team.members.filter(
                        m => m.username !== this.rootStore.userStore.user!.username
                    );
                    this.team.isTeamMem = false;
                    this.teamRegistry.set(this.team.id, this.team);
                    this.loading = false;
                }
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
            toast.error('Problem cancelling membership to team');
        }
    };

    @action removeMember = async (id: string) => {
        this.loading = true;
        try {
            await agent.Teams.remove(this.team!.id, id);
            runInAction(() => {
                if (this.team) {
                    this.team.members = this.team.members.filter(
                        m => m.id !== id
                    );
                    this.teamRegistry.set(this.team.id, this.team);
                    this.loading = false;
                }
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
            toast.error('Problem removing member');
        }
    };
}
