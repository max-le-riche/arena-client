import { Channel, ChannelParams } from "../../types";
import { baseUrl, fetchObj } from "../../util.common";

interface IChannelClass {
    idOrSlug: number | string;
    get: () => Promise<Channel>
    update: (accessCode: string, params: Partial<ChannelParams>) => Promise<Channel>
    delete: (accessCode: string) => Promise<void>

}

export default class ChannelClass implements IChannelClass {
    idOrSlug: number | string;

    constructor(idOrSlug: number | string) {
        this.idOrSlug = idOrSlug
    }

    get() {
        return fetchObj<Channel>({ url: `${baseUrl}/channels/${this.idOrSlug}`, method: 'GET' })
    }

    update(accessCode: string, params: Partial<ChannelParams>) {
        return fetchObj<Channel>({ url: `${baseUrl}/channels/${this.idOrSlug}`, 
        headers: {
            Authorization: `Bearer ${accessCode}`
        },
        params: params, method: 'PUT' })
    }

    delete(accessCode: string) {
        return fetchObj<void>({ url: `${baseUrl}/channels/${this.idOrSlug}`, 
        headers: {
            Authorization: `Bearer ${accessCode}`
        },
        method: 'DELETE' })
    }
}