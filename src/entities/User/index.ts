import { Channel, PaginatedEntity, User } from '../../types'
import { baseUrl, fetchObj } from '../../util.common';

interface IUserClass {
    id: number;
    get: () => Promise<User>
    getChannels: (accessCode: string) => Promise<PaginatedEntity<'channels', Channel, 'User', 'User'>>
    getFollowers: (accessCode: string) => Promise<PaginatedEntity<'users', User, 'User', 'User'>>
}

export default class UserClass implements IUserClass {
    id: number;

    constructor(id: number) {
        this.id = id
    }

    get() {
        return fetchObj<User>({ url: `${baseUrl}/users/${this.id}`, params: 'GET' })
    }

    getChannels(accessCode: string) {
        return fetchObj<PaginatedEntity<'channels', Channel, 'User', 'User'>>({
            url: `${baseUrl}/users/${this.id}/channels`, params: 'GET', headers: {
                Authorization: `Bearer ${accessCode}`
            }
        })
    }

    getFollowers(accessCode: string) {
        return fetchObj<PaginatedEntity<'users', User, 'User', 'User'>>({
            url: `${baseUrl}/users/${this.id}/followers`, params: 'GET', headers: {
                Authorization: `Bearer ${accessCode}`
            }
        })
    }
}