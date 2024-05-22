import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CartService } from '../../services/cart.service'
import { BadgeModule } from 'primeng/badge'
import { Observable, map } from 'rxjs'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'orders-cart-icon',
    standalone: true,
    imports: [CommonModule, BadgeModule, RouterModule],
    templateUrl: './cart-icon.component.html',
})
export class CartIconComponent implements OnInit {
    cartCount$!: Observable<number>

    // private changeDetectorRef: ChangeDetectorRef
    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        // Subscribe to the cart observable on component initialization
        this.cartCount$ = this.cartService
            .getCart()
            .pipe(map((data) => data.cartItems.length))
    }
}
