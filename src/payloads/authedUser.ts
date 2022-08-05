export interface AuthedUser {
    id: number
    email: string
    name: string
    avatarUrl: string
    role: {
        id: number
        name: string
    }
}