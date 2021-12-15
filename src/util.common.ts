import { IUser } from "./Users/util";
import axios, { Method } from 'axios'

export type Classes = 'User'
export const baseUrl = 'http://api.are.na/v2'

export interface IArenaClient {
    User(id: number): IUser
}

export function fetchObj<T>(url: string, method: Method) {
    return axios.request<T>({
        url: url,
        method: method
    }).then((res) => res.data).catch((err) => {
        console.log(err)
        throw err
    } )
}