import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../../environments/environment.development'
import { LoginCredentails, User } from '../models/users'
import { LocalsStorageService } from './localsStorage.service'
import { Router } from '@angular/router'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    apiUrlUsers = environment.apiUrl + 'users/'
    constructor(
        private http: HttpClient,
        private localsStorageService: LocalsStorageService,
        private router: Router
    ) {}
    login(credentials: LoginCredentails) {
        return this.http.post<User>(this.apiUrlUsers + 'login', credentials)
    }
    logout() {
        this.localsStorageService.deleteToken()
        this.router.navigate(['/login'])
    }
}
