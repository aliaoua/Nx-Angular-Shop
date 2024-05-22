import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { OrdersService } from '../../services/orders.service'
import { Order } from '../../models/order'
import { CartService } from '../../services/cart.service'
import { MessageService } from 'primeng/api'
import { take, timer } from 'rxjs'
@Component({
    selector: 'orders-thank-you',
    standalone: true,
    imports: [CommonModule, RouterModule, ButtonModule],
    templateUrl: './thank-you.component.html',
    providers: [MessageService],
})
export class ThankYouComponent implements OnInit {
    order!: Order
    constructor(
        private ordersService: OrdersService,
        private cartService: CartService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.order = this.ordersService.getOrderData()
        this._saveOrder()
    }

    private _saveOrder() {
        this.ordersService.addOrder(this.order).subscribe(
            () => {
                //redirect to thank you page // payment
                this.cartService.clearCart()
                this.messageService.addAll([
                    {
                        severity: 'success',
                        summary: 'Service Message',
                        detail: 'Order placed successfully',
                    },
                    {
                        severity: 'info',
                        summary: 'Info Message',
                        detail: 'Thank you for your order',
                    },
                ])
                this.ordersService.deleteOrderData()
                timer(3000)
                    .pipe(take(1))
                    .subscribe(() => this.router.navigate(['/']))
            },
            () => {
                console.log('error')
            }
        )
    }
}
