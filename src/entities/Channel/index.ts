import { Block, Channel, ChannelParams, NewBlock, PaginatedEntity, PaginatedParams, User } from "../../types";
import { baseUrl, fetchObj, serialisedURL } from "../../util.common";

interface IChannelClass {
    idOrSlug: number | string;
    get: () => Promise<Channel>
    update: (accessCode: string, params: Partial<ChannelParams>) => Promise<Channel>
    delete: (accessCode: string) => Promise<void>
    getConnections: (params?: PaginatedParams) => Promise<PaginatedEntity<'channels', Channel, 'Channel', 'Channel'>>
    getChannels: (params?: PaginatedParams) => Promise<PaginatedEntity<'channels', Channel, 'Channel', 'Channel'>>
    addBlock: (accessCode: string, data: NewBlock) => Promise<Block>
    deleteBlock: (accessCode: string, id: number) => Promise<void>
    getCollaborators: (params?: PaginatedParams) => Promise<PaginatedEntity<'users', User, 'User', 'User'>>
    addCollaborators: (accessCode: string, toAdd: number[]) => Promise<PaginatedEntity<'users', User, 'User', 'User'>>
    deleteCollaborators: (accessCode: string, toDelete: number[]) => Promise<PaginatedEntity<'users', User, 'User', 'User'>>
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
        return fetchObj<PaginatedEntity<'channels', Channel, 'Channel', 'Channel'>>({
            url: `${baseUrl}/channels/${this.idOrSlug}/connections`,
            method: 'GET',
            params: params
        })
    }

    getChannels(params?: PaginatedParams) {
        return fetchObj<PaginatedEntity<'channels', Channel, 'Channel', 'Channel'>>({
            url: `${baseUrl}/channels/${this.idOrSlug}/channels`,
            method: 'GET',
            params: params
        })
    }

    getContent(params?: PaginatedParams) {
        return fetchObj<PaginatedEntity<'contents', Block, 'Channel', 'Channel'>>({
            url: `${baseUrl}/channels/${this.idOrSlug}/contents`,
            method: 'GET',
            params: params
        })
    }

    addBlock(accessCode: string, toAdd: NewBlock) {
        switch (toAdd.type) {
            case "Text":
                return fetchObj<Block>({
                    url: `${baseUrl}/channels/${this.idOrSlug}/blocks`,
                    method: 'POST',
                    params: {
                        content: toAdd.data
                    },
                    headers: {
                        Authorization: `Bearer ${accessCode}`
                    }
                })
            case 'Source':
                return fetchObj<Block>({
                    url: `${baseUrl}/channels/${this.idOrSlug}/blocks`,
                    method: 'POST',
                    params: {
                        source: toAdd.data
                    },
                    headers: {
                        Authorization: `Bearer ${accessCode}`
                    }
                })
        }
    }

    deleteBlock(accessCode: string, id: number) {
        return fetchObj<void>({
            url: `${baseUrl}/channels/${this.idOrSlug}/blocks/${id}`,
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${accessCode}`
            }
        })
    }

    getCollaborators(params?: PaginatedParams) {
        return fetchObj<PaginatedEntity<'users', User, 'User', 'User'>>({
            url: `${baseUrl}/channels/${this.idOrSlug}/collaborators`,
            method: 'GET',
            params: params
        })
    }

    addCollaborators(accessCode: string, toAdd: number[]) {            
        return fetchObj<PaginatedEntity<'users', User, 'User', 'User'>>({
            url: serialisedURL(`${baseUrl}/channels/${this.idOrSlug}/collaborators`,toAdd ),
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessCode}`
            }
        })
    }

    deleteCollaborators(accessCode: string, toAdd: number[]) {
        return fetchObj<PaginatedEntity<'users', User, 'User', 'User'>>({
            url: serialisedURL(`${baseUrl}/channels/${this.idOrSlug}/collaborators`,toAdd ),
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${accessCode}`
            }
        })
    }
}

