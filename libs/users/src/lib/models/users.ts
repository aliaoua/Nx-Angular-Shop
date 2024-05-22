export interface User {
    _id?: string
    name?: string
    password?: string
    email?: string
    phone?: string
    token?: string
    isAdmin?: boolean
    street?: string
    apartment?: string
    zip?: string
    city?: string
    country?: string
    id: string
}
export type UserOrNull = User | null
export interface LoginCredentails {
    email: string
    password: string
}
