import jetLogger from 'jet-logger'

export function env<Or extends string | undefined = undefined>(key: string, or?: Or): Or extends string ? string : string | undefined {
    return process.env[key] ?? or as Or extends string ? string : string | undefined
}

export function isProdEnv() {
    return env('NODE_ENV') === 'production'
}

export function notIn<Object extends object>(object: Object, key: keyof Object) {
    return !(key in object)
}

export function convertPropertyNameToReadableName(name: string): string {
    return name
        .replace(/observedEvent/, '')
        .replace(/(?<=[a-z])([A-Z])/, c => ` ${c}`)
        .replace(/^([a-z])/, c => c.toUpperCase())
}

export const logger = jetLogger