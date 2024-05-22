import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { UsersService } from '../../../../../users/src'
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { CartService } from '../../services/cart.service'
import { OrdersService } from '../../services/orders.service'
import { InputNumberModule } from 'primeng/inputnumber'
import { InputTextModule } from 'primeng/inputtext'
import { DropdownModule } from 'primeng/dropdown'
import { Cart, CartItem } from '../../models/cart'
import { OrderSummaryComponent } from '../order-summary/order-summary.component'
import { HttpClientModule } from '@angular/common/http'
import { ProductsService } from '../../../../../products/src'
import { InputMaskModule } from 'primeng/inputmask'
import {
    EMPTY,
    Observable,
    Subject,
    map,
    switchMap,
    take,
    takeUntil,
    timer,
} from 'rxjs'
import { MessageService } from 'primeng/api'
import { ToastModule } from 'primeng/toast'
import { StripeService } from 'ngx-stripe'

import { Order } from '../../models/order'

@Component({
    selector: 'orders-checkout-page',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        ButtonModule,
        InputNumberModule,
        FormsModule,
        InputTextModule,
        ReactiveFormsModule,
        DropdownModule,
        OrderSummaryComponent,
        HttpClientModule,
        InputMaskModule,
        ToastModule,
    ],
    templateUrl: './checkout-page.component.html',
    providers: [UsersService, OrdersService, ProductsService, MessageService],
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
    constructor(
        private router: Router,
        private usersService: UsersService,
        private formBuilder: FormBuilder,
        private cartService: CartService,
        private ordersService: OrdersService,
        private messageService: MessageService
    ) {}
    private destroy$ = new Subject<void>()
    checkoutFormGroup!: FormGroup
    isSubmitted = false
    orderItems!: any[]
    countries!: any
    userId: any

    ngOnInit(): void {
        this._initCheckoutForm()
        this._autoFillUserData()
        this._getCartItems()
        this._getCountries()
    }

    private _initCheckoutForm() {
        this.checkoutFormGroup = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            phone: ['', Validators.required],
            city: ['', Validators.required],
            country: ['', Validators.required],
            zip: ['', Validators.required],
            apartment: ['', Validators.required],
            street: ['', Validators.required],
        })
    }

    private _getCartItems() {
        const cart: Observable<Cart> = this.cartService.getCart()

        cart.subscribe((data: Cart) => {
            this.orderItems = data.cartItems.map((item: CartItem) => {
                return {
                    product: item.productId,
                    quantity: item.quantity,
                }
            })
        })
    }

    private _getCountries() {
        this.countries = this.usersService.getCountries()
    }
    private _autoFillUserData() {
        this.usersService
            .observeCurrentUser()
            .pipe(
                map((user) => {
                    if (user) {
                        this.userId = user.id
                        this.checkoutForm['name'].setValue(user.name)
                        this.checkoutForm['email'].setValue(user.email)
                        this.checkoutForm['phone'].setValue(user.phone)
                        this.checkoutForm['street'].setValue(user.street)
                        this.checkoutForm['apartment'].setValue(user.apartment)
                        this.checkoutForm['zip'].setValue(user.zip)
                        this.checkoutForm['city'].setValue(user.city)
                        this.checkoutForm['country'].setValue(user.country)
                    }
                }),
                takeUntil(this.destroy$)
            )
            .subscribe(
                () => {},
                (error) => {
                    console.error('Error fetching user data', error)
                }
            )
    }

    backToCart() {
        this.router.navigate(['/cart'])
    }

    placeOrder() {
        this.isSubmitted = true
        if (this.checkoutFormGroup.invalid) {
            return
        }

        const order: Order = {
            orderItems: this.orderItems,
            ShippingAddress1: this.checkoutForm['street'].value,
            ShippingAddress2: this.checkoutForm['apartment'].value,
            city: this.checkoutForm['city'].value,
            zip: this.checkoutForm['zip'].value,
            country: this.checkoutForm['country'].value,
            phone: this.checkoutForm['phone'].value,
            status: 'Pending',
            user: this.userId,
            dateOrdered: `${Date.now()}`,
        }
        this.ordersService.cacheOrderData(order)
        this.ordersService
            .createCheckOutSession(this.orderItems)
            .subscribe((result) => {
                // customer using `error.message`.
                console.log(result)
                if (result.error) {
                    alert(result.error.message)
                }
            })
    }

    get checkoutForm() {
        return this.checkoutFormGroup.controls
    }
    ngOnDestroy(): void {
        this.destroy$.next()
        this.destroy$.complete()
    }
}
