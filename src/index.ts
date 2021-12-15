import UserClass from "./entities/User"
import BlockClass from "./entities/Block"
import ChannelClass from "./entities/Channel"


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
}


(new ArenaClient().Channel(`peleton-design`).getAttribtues()).then((res) => console.log(res))