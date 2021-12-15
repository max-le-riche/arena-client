import axios, { Method } from 'axios'
export const baseUrl = 'http://api.are.na/v2'


export function fetchObj<T>(url: string, method: Method) {
    return axios.request<T>({
        url: url,
        method: method
    }).then((res) => res.data).catch((err) => {
        console.log(err)
        throw err
    } )
}