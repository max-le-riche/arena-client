import { User } from "./Users";
import { IArenaClient } from "./util.common";


export class ArenaClient implements IArenaClient {
    constructor() {}

    User(id: number) {
        return new User(id)
    }
}


(new ArenaClient().User(298758).getAttribtues()).then((attributes) => console.log(attributes))