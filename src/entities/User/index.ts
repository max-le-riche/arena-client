import { User } from '../../types'
import { baseUrl, fetchObj } from '../../util.common';

interface IUserClass {
    id: number;
    getAttribtues: () => Promise<User>
    getChannels: (accessCode: string) => Promise<User>
    getFollowers: (accessCode: string) => Promise<User>
}

export default class UserClass implements IUserClass {
    id: number;

    constructor(id: number) {
        this.id = id
    }

    getAttribtues()  {
        return fetchObj<User>(`${baseUrl}/users/${this.id}`, 'GET')
    }

    getChannels(accessCode: string)  {
        return fetchObj<User>(`${baseUrl}/users/${this.id}/channels`, 'GET')
    }

    getFollowers(accessCode: string)  {
        return fetchObj<User>(`${baseUrl}/users/${this.id}/followers`, 'GET')
    }
}