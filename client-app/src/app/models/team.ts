/*
 * Defines the model used for teams
 */

export interface ITeamsEnvelope {
    teams: ITeam[];
    teamCount: number;
}

export interface ITeam {
    id: string;
    name: string;
    description: string;
    members: IMember[];
    isManager: boolean;
    isTeamMem: boolean;
}

export class TheTeam implements ITeam{
    id: string = ""
    name: string = ""
    description: string = ""
    members: IMember[] = [];
    isManager: boolean = true;
    isTeamMem: boolean = true;

    constructor(init?: ITeam){
        Object.assign(this, init);
    }
}

export interface ITeamFormValues {
    id?: string;
    name: string;
    description: string;
}

export class TeamFormValues implements ITeamFormValues {
    id?: string = undefined;
    name: string = '';
    description: string = '';

    constructor(init?: ITeamFormValues) {
        Object.assign(this, init);
    }
}

export interface IMember {
    id: string;
    username: string;
    displayName: string;
    image: string;
    isManager: boolean;
}
