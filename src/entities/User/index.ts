import { Channel, PaginatedEntity, User } from '../../types'
import { baseUrl, fetchObj } from '../../util.common';

interface IUserClass {
    id: number;
    get: () => Promise<User>
    getChannels: (accessCode: string) => Promise<PaginatedEntity<'channels', Channel, 'User', 'User'>>
    getFollowers: (accessCode: string) => Promise<PaginatedEntity<'users', User, 'User', 'User'>>
}

/**
    @class Class that implements methods to abstract 
    API endpoints associated with the User resource
*/
export default class UserClass implements IUserClass {
    id: number;

    /**
        @constructor Initialises and returns a User object 
        @param {number} id - Arena ID of the User being initialised
    */
    constructor(id: number) {
        this.id = id
    }

    /**
     * Function to get and return the Users the attributes.
     * @function 
    */
    get() {
        return fetchObj<User>({ url: `${baseUrl}/users/${this.id}`, params: 'GET' })
    }

    /**
     * Function to get and return the Users channels. 
     * @param {accessCode} string - OAtuh access code to perform the authenticated request.
     * @function 
    */
    getChannels(accessCode: string) {
        return fetchObj<PaginatedEntity<'channels', Channel, 'User', 'User'>>({
            url: `${baseUrl}/users/${this.id}/channels`, params: 'GET', headers: {
                Authorization: `Bearer ${accessCode}`
            }
        })
    }

    /**
     * Function to get and return the Users followers. 
     * @param {accessCode} string - OAtuh access code to perform the authenticated request.
    */
    getFollowers(accessCode: string) {
        return fetchObj<PaginatedEntity<'users', User, 'User', 'User'>>({
            url: `${baseUrl}/users/${this.id}/followers`, params: 'GET', headers: {
                Authorization: `Bearer ${accessCode}`
            }
        })
    }
}