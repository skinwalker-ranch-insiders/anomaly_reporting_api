import { env } from './misc'

export const SERVER_PORT = env('SERVER_PORT', '3000')
export const COOKIE_SECRET = env('COOKIE_SECRET')
export const COOKIE_NAME = env('COOKIE_NAME', 'token')
export const COOKIE_EXP = env('COOKIE_EXP', '0')