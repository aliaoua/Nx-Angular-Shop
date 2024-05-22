import { Component, OnInit } from '@angular/core'
import { CommonModule, Location } from '@angular/common'
import { CardModule } from 'primeng/card'
import { ToastModule } from 'primeng/toast'
import { FieldsetModule } from 'primeng/fieldset'
import { MessageService } from 'primeng/api'
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown'
import { Order, OrdersService } from '@org/orders'
import { ActivatedRoute } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { take, timer } from 'rxjs'

const ORDER_Status = {
    Pending: { label: 'Pending', color: 'primary' },
    Processed: { label: 'Processed', color: 'warning' },
    Shipped: { label: 'Shipped', color: 'warning' },
    Delivered: { label: 'Delivered', color: 'success' },
    Failed: { label: 'Failed', color: 'danger' },
}
@Component({
    selector: 'admin-order-details',
    standalone: true,
    imports: [
        CommonModule,
        CardModule,
        ToastModule,
        FieldsetModule,
        DropdownModule,
        HttpClientModule,
        FormsModule,
    ],
    templateUrl: './order-details.component.html',
    providers: [MessageService, OrdersService],
})
export class OrderDetailsComponent implements OnInit {
    dropdownOptions = Object.entries(ORDER_Status).map(([key, value]) => ({
        value: key,
        label: value.label,
        color: value.color,
    }))

    order!: Order
    id = ''
    constructor(
        private ordersService: OrdersService,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private location: Location
    ) {}
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.id = params['id']
            this._getOrder(this.id)
        })
    }
    private _getOrder(id: string) {
        this.ordersService.getOrder(id).subscribe((order) => {
            this.order = order
        })
    }
    onSelectedStatusChange(e: DropdownChangeEvent) {
        this.ordersService.updateOrder({ status: e.value }, this.id).subscribe(
            (order) => {
                this.order = order

                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Status is updated!`,
                })
                timer(800)
                    .pipe(take(1))
                    .subscribe(() => this.location.back())
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Status is not updated!',
                })
            }
        )
    }
}
