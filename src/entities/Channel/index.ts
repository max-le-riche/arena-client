import { Channel, ChannelParams, PaginatedEntity, PaginatedParams } from "../../types";
import { baseUrl, fetchObj } from "../../util.common";

interface IChannelClass {
    idOrSlug: number | string;
    get: () => Promise<Channel>
    update: (accessCode: string, params: Partial<ChannelParams>) => Promise<Channel>
    delete: (accessCode: string) => Promise<void>
    getConnections: (params?: PaginatedParams) => Promise<PaginatedEntity<'channels', 'Channel', 'Channel'>>
    getChannels: (params?: PaginatedParams) => Promise<PaginatedEntity<'channels', 'Channel', 'Channel'>>

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
        return fetchObj<Channel>({
            url: `${baseUrl}/channels/${this.idOrSlug}`,
            headers: {
                Authorization: `Bearer ${accessCode}`
            },
            params: params, method: 'PUT'
        })
    }

    delete(accessCode: string) {
        return fetchObj<void>({
            url: `${baseUrl}/channels/${this.idOrSlug}`,
            headers: {
                Authorization: `Bearer ${accessCode}`
            },
            method: 'DELETE'
        })
    }

    getConnections(params?: PaginatedParams) {
        return fetchObj<PaginatedEntity<'channels', 'Channel', 'Channel'>>({
            url: `${baseUrl}/channels/${this.idOrSlug}/connections`,
            method: 'GET',
            params: params
        })
    }

    getChannels(params?: PaginatedParams) {
        return fetchObj<PaginatedEntity<'channels', 'Channel', 'Channel'>>({
            url: `${baseUrl}/channels/${this.idOrSlug}/channels`,
            method: 'GET',
            params: params
        })
    }
}

