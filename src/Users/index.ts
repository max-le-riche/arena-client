import { baseUrl, Classes, fetchObj } from "../util.common";
import { IUser, IUserResponse } from "./util";


export class User implements IUser {
    id: number;

    constructor(id: number) {
        this.id = id
    }

    getAttribtues()  {
        return fetchObj<IUserResponse>(`${baseUrl}/users/${this.id}`, 'GET')
    }

    getChannels(accessCode: string)  {
        return fetchObj<IUserResponse>(`${baseUrl}/users/${this.id}/channels`, 'GET')
    }

    getFollowers(accessCode: string)  {
        return fetchObj<IUserResponse>(`${baseUrl}/users/${this.id}/followers`, 'GET')
    }
}