import { Block } from '../types'
import { baseUrl, fetchObj } from '../util.common';

interface IBlockClass {
    id: number;
}

export default class BlockClass implements IBlockClass {
    id: number;

    constructor(id: number) {
        this.id = id
    }


}