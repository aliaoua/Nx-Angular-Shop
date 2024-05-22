import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../../environments/environment.development'
import { User } from '../models/users'
import { TCountryCode, countries, getCountryData } from 'countries-list'
import { ICountry, ILanguage } from 'countries-list'
import { UsersFacade } from '../state/users.facade'
@Injectable({
    providedIn: 'root',
})
export class UsersService {
    apiUrlUsers = environment.apiUrl + 'users/'
    constructor(private http: HttpClient, private usersFacade: UsersFacade) {}

    getUsers() {
        return this.http.get<User[]>(this.apiUrlUsers)
    }
    getUser(id: string) {
        return this.http.get<User>(this.apiUrlUsers + id)
    }
    addUser(User: User) {
        return this.http.post<User>(this.apiUrlUsers, User)
    }
    updateUser(id: string, User: FormData) {
        return this.http.put<User>(this.apiUrlUsers + id, User)
    }
    deleteUser(id: string) {
        return this.http.delete<any>(this.apiUrlUsers + id)
    }
    getCountries(): { id: string; name: string }[] {
        // Convert countries object to an array of countries

        return Object.entries(countries).map((entry) => {
            return { id: entry[0], name: entry[1].native }
        })
    }
    getCountryName(countryCode: TCountryCode) {
        // Retrieve the country data for the given country code
        const countryData = getCountryData(countryCode)

        // Check if the country data exists
        if (countryData) {
            // Return the name of the country
            return countryData.name
        } else {
            // If country data doesn't exist, return undefined or handle error accordingly
            return undefined // or throw new Error('Country code not found');
        }
    }
    initAppSession() {
        this.usersFacade.buildUserSession()
    }
    observeCurrentUser() {
        return this.usersFacade.currentUser$
    }
    isCurrentUserAuth() {
        return this.usersFacade.isAuthenticated$
    }
}
