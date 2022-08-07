import jetLogger from 'jet-logger'

export function env<Or extends string | undefined = undefined>(key: string, or?: Or): Or extends string ? string : string | undefined {
    return process.env[key] ?? or as Or extends string ? string : string | undefined
}

export function isProdEnv() {
    return env('NODE_ENV') === 'production'
}

export function notIn(object: object, key: string) {
    return !(key in object)
}

export const logger = jetLogger