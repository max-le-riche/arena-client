import { Classes } from "../util.common";

export interface IUserResponse {
    readonly id: number,
    readonly slug: string,
    readonly username: string,
    readonly first_name: string,
    readonly last_name: string,
    readonly avatar: string,
    readonly channel_count: number,
    readonly following_count: number,
    readonly profile_id: number,
    readonly follower_count: string,
    readonly class: Extract<Classes, "User">,
    readonly initials: string,
}

export interface IUser {
    id: number;
    getAttribtues: () => Promise<IUserResponse>
    getChannels: (accessCode: string) => Promise<IUserResponse>
    getFollowers: (accessCode: string) => Promise<IUserResponse>
}