import { Channel } from "../../types";
import { baseUrl, fetchObj } from "../../util.common";

interface IChannelClass {
    idOrSlug: number | string;
    getAttribtues: () => Promise<Channel>
}

export default class ChannelClass implements IChannelClass {
    idOrSlug: number | string;

    constructor(idOrSlug: number | string) {
        this.idOrSlug = idOrSlug
    }

    getAttribtues() {
        return fetchObj<Channel>({ url: `${baseUrl}/channels/${this.idOrSlug}`, params: 'GET' })
    }

}