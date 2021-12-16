import UserClass from "./entities/User"
import BlockClass from "./entities/Block"
import ChannelClass from "./entities/Channel"
import { ChannelParams, Channel } from "./types"
import { fetchObj, baseUrl } from "./util.common"


export interface IArenaClient {
    User(id: number): UserClass
    Channel(id: number): ChannelClass
    Block(id: number): BlockClass
    createChannel(accessCode: string, params: ChannelParams): Promise<Channel>
}


export class ArenaClient implements IArenaClient {
    constructor() { }

    /**
     * Initializes and returns a User object. 
     * @param {number} id - id of the User being initialize.
    */
    User(id: number) {
        return new UserClass(id)
    }

    /**
     * Initializes and returns a Channel object.
     * @param {number | string} idOrSlug - id or slug of the Channel being initialize.
    */
    Channel(idOrSlug: number | string) {
        return new ChannelClass(idOrSlug)
    }

    /**
     * Initializes and returns a Block object. 
     * @param {number} id - id of the Block being initialize.
    */
    Block(id: number) {
        return new BlockClass(id)
    }

    /**
     * Function to create and return a new channel for an authenticated user. 
     * @param {accessCode} string - OAuth code to perform the authenticated request.
     * @param {ChannelParams} params - attribtues for the new channel.
    */
    createChannel(accessCode: string, params: ChannelParams) {
        return fetchObj<Channel>({
            url: `${baseUrl}/channels/`,
            headers: {
                Authorization: `Bearer ${accessCode}`
            },
            params: params, method: 'POST'
        })
    }
}