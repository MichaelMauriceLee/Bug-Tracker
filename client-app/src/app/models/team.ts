/*
 * Defines the model used for activities
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
    username: string;
    displayName: string;
    image: string;
    isManager: boolean;
}
