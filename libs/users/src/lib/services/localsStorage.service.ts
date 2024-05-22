import { Injectable } from '@angular/core'

const TOKEN = 'jwtToken'
@Injectable({
    providedIn: 'root',
})
export class LocalsStorageService {
    constructor() {}
    setToken(data: string) {
        localStorage.setItem(TOKEN, data)
    }
    getToken() {
        return localStorage.getItem(TOKEN)
    }
    deleteToken() {
        localStorage.removeItem(TOKEN)
    }
    isValidToken() {
        const token = this.getToken()
        if (token) {
            const tokenPayload = token.split('.')[1]
            const tokenDecode = JSON.parse(atob(tokenPayload))

            return this._tokenNotExpired(tokenDecode.exp)
        } else {
            return false
        }
    }
    getUserIdFromToken() {
        const token = this.getToken()
        if (token) {
            const tokenPayload = token.split('.')[1]
            const tokenDecode = JSON.parse(atob(tokenPayload))
            if (token) {
                return tokenDecode.userId
            } else {
                return null
            }
        } else {
            return null
        }
    }
    private _tokenNotExpired(expiration: number): boolean {
        return Math.floor(Date.now() / 1000) <= expiration
    }
}
