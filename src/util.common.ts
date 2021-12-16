import axios, { AxiosRequestConfig, Method } from 'axios'
export const baseUrl = 'https://api.are.na/v2'


export function fetchObj<T>(config: AxiosRequestConfig) {
    return axios.request<T>(config).then((res) => res.data)
}

export function serialisedURL(url: string, ids: number[]) {
    if (ids.length)
        url += `?${serialiseIds(ids)}`
    return url
}

function serialiseIds(ids: number[]) {
    return encodeURI(ids.map((v) => `ids[]=${v}`).join('&'))
}