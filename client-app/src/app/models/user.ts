/*
 * Defines the model used for user
 */

export interface IUser {
    id: string;
    username: string;
    displayName: string;
    token: string;
    image?: string;
}

export interface IUserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
}