import { Block, Channel, Classes, PaginatedEntity, PaginatedParams, PaginatedResponse, UpdateBlockParams } from "../../types";
import { fetchObj, baseUrl } from "../../util.common";

interface IBlockClass {
    id: number;
    get: () => Promise<Block>
    update: (params?: UpdateBlockParams) => Promise<Block>
    getChannels: (params?: PaginatedParams) => Promise<PaginatedEntity<'channels', 'Block', 'Text'>>
}

export default class BlockClass implements IBlockClass {
    id: number;

    constructor(id: number) {
        this.id = id
    }

    get() {
        return fetchObj<Block>({ url: `${baseUrl}/blocks/${this.id}`, method: 'GET' })
    }

    update(params?: UpdateBlockParams) {
        return fetchObj<Block>(
            { url: `${baseUrl}/blocks/${this.id}`, method: 'PUT', params: params }
        )
    }

    getChannels(params?: PaginatedParams) {
        return fetchObj<PaginatedEntity<'channels', 'Block', 'Text'>>(
            { url: `${baseUrl}/blocks/${this.id}/channels`, method: 'GET', params: params }
        )
    }
}