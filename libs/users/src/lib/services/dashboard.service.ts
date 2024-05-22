import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../../environments/environment.development'
import { User } from '../models/users'
import { Observable } from 'rxjs'

export interface TotalSales {
    totalsales: number
}
export interface TotalUsers {
    count: number
}
export interface TotalProducts {
    count: number
}
export interface TotalOrders {
    orderCount: number
}
@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    apiUrl = environment.apiUrl
    constructor(private http: HttpClient) {}

    getTotalUsers() {
        return this.http.get<TotalUsers>(this.apiUrl + 'users/get/count')
    }
    getTotalProducts() {
        return this.http.get<TotalProducts>(this.apiUrl + 'products/get/count')
    }
    getTotalOrders() {
        return this.http.get<TotalOrders>(this.apiUrl + 'orders/get/count')
    }
    getTotalSales() {
        return this.http.get<TotalSales>(this.apiUrl + 'orders/get/totalsales')
    }
}
