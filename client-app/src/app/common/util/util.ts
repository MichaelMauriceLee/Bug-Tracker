import {ITeam, IMember} from "../../models/team";
import {IUser} from "../../models/user";

/*
 * Contains useful functions
 */

export const combineDateAndTime = (date: Date, time: Date) => {
    const dateString = date.toISOString().split('T')[0];
    const timeString = time.toISOString().split('T')[1];

    return new Date(dateString + 'T' + timeString);
}

export const setTeamProps = (team: ITeam, user: IUser) => {
    team.isTeamMem = team.members.some(
        m => m.username === user.username
    )
    team.isManager = team.members.some(
        m => m.username === user.username && m.isManager
    )
    return team;
}

export const createMember = (user: IUser): IMember => {
    return {
        displayName: user.displayName,
        isManager: false,
        username: user.username,
        image: user.image!
    }
}