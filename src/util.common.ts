import axios, { AxiosRequestConfig, Method } from 'axios'
export const baseUrl = 'http://api.are.na/v2'


export function fetchObj<T>(config: AxiosRequestConfig) {
    return axios.request<T>(config).then((res) => res.data).catch((err) => {
        console.log(err)
        throw err
    } )
}