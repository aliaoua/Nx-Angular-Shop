import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { Product } from '../../services/models/product'
import { ProductsService } from '../../services/products.service'
import { HttpClientModule } from '@angular/common/http'
import { RatingModule } from 'primeng/rating'
import { FormsModule } from '@angular/forms'
import { InputNumberModule } from 'primeng/inputnumber'
import { ButtonModule } from 'primeng/button'
import { GalleryComponent } from '../../../../../ui/src'
import { CartService } from '../../../../../orders/src'
@Component({
    selector: 'products-product-page',
    standalone: true,
    imports: [
        CommonModule,
        HttpClientModule,
        RatingModule,
        FormsModule,
        InputNumberModule,
        ButtonModule,
        GalleryComponent,
    ],
    templateUrl: './product-page.component.html',
    providers: [ProductsService],
})
export class ProductPageComponent implements OnInit, OnDestroy {
    product$: Observable<Product> | null = null
    id = ''
    quantityVariable = 1
    rating!: number
    productSubscription!: Subscription
    constructor(
        private route: ActivatedRoute,
        private productService: ProductsService,
        private cartService: CartService
    ) {}
    ngOnInit(): void {
        this.productSubscription = this.route.params.subscribe((params) => {
            this.id = params['productId']
        })
        this.product$ = this.productService.getProduct(this.id)
    }
    addProductToCart() {
        const cartItem = {
            productId: this.id,
            quantity: this.quantityVariable,
        }
        this.cartService.setCartItem(cartItem)
    }
    ngOnDestroy(): void {
        if (this.productSubscription) {
            this.productSubscription.unsubscribe()
        }
    }
}
