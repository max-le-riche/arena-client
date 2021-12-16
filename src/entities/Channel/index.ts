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

/**
    @class Class that implements methods to abstract 
    API endpoints associated with the Channel resource
*/
export default class ChannelClass implements IChannelClass {
    idOrSlug: number | string;

    /**
        @constructor Initialises and returns a Channel object 
        @param {number | string} idOrSlug - The Arena slug or ID of the Channel being initialised
    */
    constructor(idOrSlug: number | string) {
        this.idOrSlug = idOrSlug
    }

    /**
     * Function to get and return the Channels the attributes.
     * @function
    */
    get() {
        return fetchObj<Channel>({ url: `${baseUrl}/channels/${this.idOrSlug}`, method: 'GET' })
    }

    /**
     * Function to get and return the Channels the attributes
     * @function
     * @param {accessCode} string - Oauth access code to perform the authenticated request.\
     * @param {Partial<ChannelParams>} params - Channel attributes and values to be updated
    */
    update(accessCode: string, params: Partial<ChannelParams>) {
        return fetchObj<Channel>({
            url: `${baseUrl}/channels/${this.idOrSlug}`,
            headers: {
                Authorization: `Bearer ${accessCode}`
            },
            params: params, method: 'PUT'
        })
    }

    /**
     * Function to permenantly delete the Channel (does not cascade to resources)
     * @function
     * @param {accessCode} string - Oauth access code to perform the authenticated request.\
    */
    delete(accessCode: string) {
        return fetchObj<void>({
            url: `${baseUrl}/channels/${this.idOrSlug}`,
            headers: {
                Authorization: `Bearer ${accessCode}`
            },
            method: 'DELETE'
        })
    }

     /**
     * Function to get and return a paginated response containing the Channels connections
     * @function
     * @param {params} PaginatedParams - optional pagination parameters to query with
    */
    getConnections(params?: PaginatedParams) {
        return fetchObj<PaginatedEntity<'channels', Channel, 'Channel', 'Channel'>>({
            url: `${baseUrl}/channels/${this.idOrSlug}/connections`,
            method: 'GET',
            params: params
        })
    }

     /**
     * Function to get and return a paginated response containing the Channels connections
     * @function
     * @param {params} PaginatedParams - optional pagination parameters to query with
    */
    getChannels(params?: PaginatedParams) {
        return fetchObj<PaginatedEntity<'channels', Channel, 'Channel', 'Channel'>>({
            url: `${baseUrl}/channels/${this.idOrSlug}/channels`,
            method: 'GET',
            params: params
        })
    }

    /**
     * Function to get and return a paginated response containing the Channels content
     * @function 
     * @param {params} PaginatedParams - optional pagination parameters to query with
    */
    getContent(params?: PaginatedParams) {
        return fetchObj<PaginatedEntity<'contents', Block, 'Channel', 'Channel'>>({
            url: `${baseUrl}/channels/${this.idOrSlug}/contents`,
            method: 'GET',
            params: params
        })
    }

    /**
     * Function to add a new Block to the Channel
     * @function 
     * @param {accessCode} string - OAtuh access code to perform the authenticated request.
     * @param {NewBlock} toAdd - object to define type & data of the new Block
    */
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

    /**
     * Function to add a new Block to the Channel
     * @function 
     * @param {accessCode} string - OAtuh access code to perform the authenticated request.
     * @param {NewBlock} toAdd - object to define type & data of the new Block
    */
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

