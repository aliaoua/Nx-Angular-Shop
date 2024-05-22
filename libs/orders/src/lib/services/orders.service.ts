import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../../environments/environment.development'
import { Order, OrderItem } from '../models/order'
import { Observable, map, switchMap } from 'rxjs'
import { StripeService } from 'ngx-stripe'
import { StripeError } from '@stripe/stripe-js'

@Injectable({
    providedIn: 'root',
})
export class OrdersService {
    apiUrlOrders = environment.apiUrl + 'orders/'
    apiUrlProducts = environment.apiUrl + 'products/'
    constructor(
        private http: HttpClient,
        private stripeService: StripeService
    ) {}

    getOrders() {
        return this.http.get<Order[]>(this.apiUrlOrders)
    }
    getOrder(id: string) {
        return this.http.get<Order>(this.apiUrlOrders + id)
    }
    addOrder(order: Order) {
        return this.http.post<Order>(this.apiUrlOrders, order)
    }
    updateOrder(orderStatus: { status: String }, id: string) {
        return this.http.put<Order>(this.apiUrlOrders + id, orderStatus)
    }
    deleteOrder(id: string) {
        return this.http.delete<any>(this.apiUrlOrders + id)
    }
    getProduct(id: string) {
        return this.http.get<any>(this.apiUrlProducts + id)
    }
    createCheckOutSession(
        orderItems: OrderItem[]
    ): Observable<{ error: StripeError }> {
        return this.http
            .post<{ id: string }>(
                `${this.apiUrlOrders}create-checkout-session`,
                orderItems
            )
            .pipe(
                switchMap((session: { id: string }) => {
                    return this.stripeService.redirectToCheckout({
                        sessionId: session.id,
                    })
                })
            )
    }
    cacheOrderData(order: Order) {
        localStorage.setItem('orderData', JSON.stringify(order))
    }
    getOrderData() {
        const data = localStorage.getItem('orderData')
        if (data) {
            return JSON.parse(data)
        }
    }
    deleteOrderData() {
        localStorage.removeItem('orderData')
    }
}
