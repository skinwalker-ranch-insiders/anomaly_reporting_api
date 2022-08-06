import axios, { AxiosResponseHeaders } from 'axios'
import FormData from 'form-data'

interface CookieMap {
    [key: string]: {
        value: string
        domain: string
        path: string
        secure: boolean
        httpOnly: boolean
    }
}

export function parseCookies(headers: AxiosResponseHeaders): CookieMap {
    const rawCookies = headers['set-cookie']

    if (!rawCookies) {
        throw new Error('Unable to read cookies')
    }

    const parsedCookies = {} as CookieMap

    for (const cookie of rawCookies) {
        const [data, ...metadata] = cookie.split(/;\s?/)
        const [key, value] = data.split(/=/)

        parsedCookies[key] = {
            value,
            domain: metadata.find(part => part.startsWith('domain'))?.replace(/domain=/, '') ?? '',
            path: metadata.find(part => part.startsWith('path'))?.replace(/path=/, '') ?? '',
            secure: metadata.some(part => part.toLowerCase() === 'secure'),
            httpOnly: metadata.some(part => part.toLowerCase() === 'httponly')
        }
    }

    return parsedCookies
}

export function formData(data: { [key: string]: any }): FormData {
    const formData = new FormData()

    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string') {
            formData.append(key, value)
        }
    }

    return formData
}

export const request = axios