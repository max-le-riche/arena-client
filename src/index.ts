import UserClass from "./entities/User"
import BlockClass from "./entities/Block"


interface IArenaClient {
    User(id: number): UserClass
}


export class ArenaClient implements IArenaClient {
    constructor() {}

    User(id: number) {
        return new UserClass(id)
    }

    Block(id: number) {
        return new BlockClass(id)
    }
}


(new ArenaClient().User(298758).getAttribtues()).then((attributes) => console.log(attributes))