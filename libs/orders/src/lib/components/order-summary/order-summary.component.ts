import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, forkJoin, of } from 'rxjs'
import { map, switchMap, take } from 'rxjs/operators'
import { CartService } from '../../services/cart.service'
import { CommonModule } from '@angular/common'
import { Product, ProductsService } from '../../../../../products/src'
import { CartItem } from '../../models/cart'
import { ButtonModule } from 'primeng/button'

@Component({
    selector: 'orders-order-summary',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    templateUrl: './order-summary.component.html',
})
export class OrderSummaryComponent implements OnInit {
    totalPrice$!: Observable<number>
    isCheckout = false
    constructor(
        private router: Router,
        private cartService: CartService,
        private productsService: ProductsService
    ) {
        this.router.url.includes('checkout')
            ? (this.isCheckout = true)
            : (this.isCheckout = false)
    }

    ngOnInit(): void {
        this._getOrderSummary()
    }

    _getOrderSummary() {
        return (this.totalPrice$ = this.cartService.cart$.pipe(
            switchMap((cart) => {
                if (!cart) {
                    return of(0) // Emit 0 if cart is empty
                }

                return forkJoin(
                    cart.cartItems.map((item: CartItem) => {
                        if (typeof item.productId === 'string') {
                            return this.productsService
                                .getProduct(item.productId)
                                .pipe(
                                    take(1),
                                    map(
                                        (product: Product) =>
                                            (product.price ?? 0) *
                                            (item.quantity ?? 0)
                                    )
                                )
                        } else {
                            return of(0) // Handle non-string items (optional)
                        }
                    })
                ).pipe(
                    map((prices: number[]) =>
                        prices.reduce(
                            (acc: number, price: number) => acc + price,
                            0
                        )
                    ) // Sum all prices
                )
            })
        ))
    }

    navigateToCheckout() {
        this.router.navigate(['/checkout'])
    }
}
