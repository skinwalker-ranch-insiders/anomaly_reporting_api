import jetLogger from 'jet-logger'

export function isProdEnv() {
    return process.env.NODE_ENV === 'production'
}

export function notIn(object: object, key: string) {
    return !(key in object)
}

export const logger = jetLogger