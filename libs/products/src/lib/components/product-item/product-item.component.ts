import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonModule } from 'primeng/button'
import { Product } from '../../services/models/product'
import { RouterModule } from '@angular/router'
import { Cart, CartItem, CartService } from '../../../../../orders/src'
import { ToastModule } from 'primeng/toast'
import { MessageService } from 'primeng/api'
@Component({
    selector: 'products-product-item',
    standalone: true,
    imports: [CommonModule, ButtonModule, RouterModule, ToastModule],
    templateUrl: './product-item.component.html',
    providers: [MessageService],
})
export class ProductItemComponent {
    @Input() product: Product | null = null
    constructor(
        private cartService: CartService,
        private messageService: MessageService
    ) {}
    addProductToCart() {
        const cartItem: CartItem = {
            productId: this.product?.id,
            quantity: 1,
        }

        let cart = this.cartService.setCartItem(cartItem)
        if (cart) {
            this.messageService.add({
                severity: 'success',
                summary: 'Shopping Cart',
                detail: 'Product Added',
            })
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Message Content',
            })
        }
    }
    deleteProduct(product: Product) {
        this.cartService.deleteItem(product.id)
    }
}
