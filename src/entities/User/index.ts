import { PaginatedEntity, User } from '../../types'
import { baseUrl, fetchObj } from '../../util.common';

interface IUserClass {
    id: number;
    getAttribtues: () => Promise<User>
    getChannels: (accessCode: string) => Promise<PaginatedEntity<'channels', 'User', 'User'>>
    getFollowers: (accessCode: string) => Promise<PaginatedEntity<'users', 'User', 'User'>>
}

export default class UserClass implements IUserClass {
    id: number;

    constructor(id: number) {
        this.id = id
    }

    getAttribtues() {
        return fetchObj<User>({ url: `${baseUrl}/users/${this.id}`, params: 'GET' })
    }

    getChannels(accessCode: string) {
        return fetchObj<PaginatedEntity<'channels', 'User', 'User'>>({
            url: `${baseUrl}/users/${this.id}/channels`, params: 'GET', headers: {
                Authorization: `Bearer ${accessCode}`
            }
        })
    }

    getFollowers(accessCode: string) {
        return fetchObj<PaginatedEntity<'users', 'User', 'User'>>({
            url: `${baseUrl}/users/${this.id}/followers`, params: 'GET', headers: {
                Authorization: `Bearer ${accessCode}`
            }
        })
    }
}