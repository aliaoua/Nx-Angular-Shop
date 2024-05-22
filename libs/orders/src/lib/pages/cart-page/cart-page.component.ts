import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { Observable, forkJoin, of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'

import { CartService } from '../../services/cart.service'
import { OrdersService } from '../../services/orders.service'
import { ButtonModule } from 'primeng/button'
import { InputNumberModule } from 'primeng/inputnumber'
import { HttpClientModule } from '@angular/common/http'
import { CartItemDetailed } from '../../models/cart'
import { FormsModule } from '@angular/forms'
import { ProductsService } from '../../../../../products/src'
import { OrderSummaryComponent } from '../../components/order-summary/order-summary.component'

@Component({
    selector: 'orders-cart-page',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        InputNumberModule,
        HttpClientModule,
        FormsModule,
        RouterModule,
        OrderSummaryComponent,
    ],
    templateUrl: './cart-page.component.html',
    providers: [OrdersService, ProductsService],
})
export class CartPageComponent implements OnInit {
    cartItemsDetailed$!: Observable<any>
    cartCount!: Observable<number>
    constructor(
        private ordersService: OrdersService,
        private cartService: CartService,
        private route: Router,
        private productsService: ProductsService
    ) {}
    ngOnInit(): void {
        this._getCartDetails()
        this.cartCount = this.cartService
            .getCart()
            .pipe(map((cart) => cart.cartItems.length))
    }

    private _getCartDetails() {
        this.cartItemsDetailed$ = this.cartService.getCart().pipe(
            switchMap((respCart) => {
                const detailedCartItems$ = respCart.cartItems.map(
                    (cartItem) => {
                        if (typeof cartItem.productId === 'string') {
                            return this.ordersService
                                .getProduct(cartItem.productId)
                                .pipe(
                                    map((product) => ({
                                        product,
                                        quantity: cartItem.quantity,
                                    }))
                                )
                        } else {
                            // Handle undefined or non-string product IDs (optional)
                            return of(null) // Or handle differently based on your requirements
                        }
                    }
                )
                const result = forkJoin(detailedCartItems$).pipe(
                    map((items) => items.filter((item) => item !== null)) // Filter out null values
                )
                // this.cartCount = result.pipe(map((data) => data.length))
                return result
            })
        )
    }

    backToShop() {
        this.route.navigate(['/products'])
    }

    deleteCartItem(cartItem: CartItemDetailed) {
        this.cartService.deleteItem(cartItem.product.id)
    }

    updateCartItemQuantity(event: any, cartItem: CartItemDetailed) {
        this.cartService.setCartItem(
            {
                productId: cartItem.product.id,
                quantity: event.value,
            },
            true
        )
    }
}
