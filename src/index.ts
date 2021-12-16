import UserClass from "./entities/User"
import BlockClass from "./entities/Block"
import ChannelClass from "./entities/Channel"
import { ChannelParams, Channel } from "./types"
import { fetchObj, baseUrl } from "./util.common"


interface IArenaClient {
    
    User(id: number): UserClass
}


export class ArenaClient implements IArenaClient {
    constructor() {}

    User(id: number) {
        return new UserClass(id)
    }

    Channel(idOrSlug: number | string) {
        return new ChannelClass(idOrSlug)
    }

    Block(id: number) {
        return new BlockClass(id)
    }

    createChannel(accessCode: string, params: ChannelParams) {
        
        return fetchObj<Channel>({ url: `${baseUrl}/channels/`, 
        headers: {
            Authorization: `Bearer ${accessCode}`
        },
        params: params, method: 'POST' })
    }
}