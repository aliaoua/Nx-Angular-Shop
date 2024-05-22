import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
} from '@angular/router'
import { inject } from '@angular/core'
import { LocalsStorageService } from './localsStorage.service'

interface DecodedToken {
    userId: string
    isAdmin: boolean
    iat: number
    exp: number
}

export const isAdminGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const localsStorageService = inject(LocalsStorageService)
    const token = localsStorageService.getToken()

    if (token) {
        const tokenPayload = token.split('.')[1]
        const tokenDecode = JSON.parse(atob(tokenPayload)) as DecodedToken

        if (tokenDecode.isAdmin && tokenNotExpired(tokenDecode.exp)) {
            return true // Allow access if user is admin and token is not expired
        } else {
            const router = inject(Router)
            return router.createUrlTree(['login'])
        }
    } else {
        // Redirect to fallback page (replace with desired path)
        const router = inject(Router)
        return router.createUrlTree(['login']) // Redirect to login if token is not present
    }
}
export const isUserGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const localsStorageService = inject(LocalsStorageService)
    const token = localsStorageService.getToken()

    if (token) {
        const tokenPayload = token.split('.')[1]
        const tokenDecode = JSON.parse(atob(tokenPayload)) as DecodedToken

        if (!tokenDecode.isAdmin && tokenNotExpired(tokenDecode.exp)) {
            return true // Allow access if user is admin and token is not expired
        } else {
            const router = inject(Router)
            return router.createUrlTree(['login'])
        }
    } else {
        // Redirect to fallback page (replace with desired path)
        const router = inject(Router)
        return router.createUrlTree(['login']) // Redirect to login if token is not present
    }
}

function tokenNotExpired(expiration: number): boolean {
    return Math.floor(Date.now() / 1000) <= expiration
}
