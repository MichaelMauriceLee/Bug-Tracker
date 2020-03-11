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
    // activity.isGoing = activity.attendees.some(
    //     a => a.username === user.username
    // )
    // activity.isHost = activity.attendees.some(
    //     a => a.username === user.username && a.isHost
    // )
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