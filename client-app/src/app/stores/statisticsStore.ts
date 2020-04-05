import {RootStore} from "./rootStore";
import {action, observable, reaction, runInAction} from "mobx";
import {ITeam} from "../models/team";
import agent from "../api/agent";
import {setTeamProps} from "../common/util/util";
import { IStatistics } from "../models/statistics";


export default class StatisticsStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable loadingInitial = false;
    @observable submitting = false;
    @observable loading = false;
    @observable statistics: IStatistics | null = null ;

    @action loadStatistics = async () => {
        this.loadingInitial = true;
        try {
            const stats = await agent.Statistics.statistics();
            runInAction('loading statistics', () => {
                this.loadingInitial = false;
                this.statistics = stats;
            });
        } catch (error) {
            runInAction('load statistics error', () => {
                this.loadingInitial = false;
            });
        }
    };
}