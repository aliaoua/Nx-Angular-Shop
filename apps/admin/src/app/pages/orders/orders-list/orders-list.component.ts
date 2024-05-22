import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { ToolbarModule } from 'primeng/toolbar'
import { CardModule } from 'primeng/card'
import { RouterModule } from '@angular/router'
import { ToastModule } from 'primeng/toast'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { Observable } from 'rxjs'
import { Order, OrdersService } from '@org/orders'
import { TagModule } from 'primeng/tag'

const ORDER_Status = {
    Pending: { label: 'Pending', color: 'primary' },
    Processed: { label: 'Processed', color: 'warning' },
    Shipped: { label: 'Shipped', color: 'warning' },
    Delivered: { label: 'Delivered', color: 'success' },
    Failed: { label: 'Failed', color: 'danger' },
}
@Component({
    selector: 'admin-orders-list',
    standalone: true,
    imports: [
        CommonModule,
        HttpClientModule,
        TableModule,
        ButtonModule,
        ToolbarModule,
        CardModule,
        RouterModule,
        ToastModule,
        ConfirmDialogModule,
        TagModule,
    ],
    templateUrl: './orders-list.component.html',
    providers: [OrdersService, ConfirmationService, MessageService],
})
export class OrdersListComponent implements OnInit {
    orderStatus: any = ORDER_Status
    orders$: Observable<Order[]> | null = null
    constructor(
        private ordersService: OrdersService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}
    ngOnInit(): void {
        this._getOrders()
    }
    showDeleteConfirmation(orderId: string): void {
        this.confirmationService.confirm({
            message: 'Do you want to delete this Order?',
            header: 'Delete Order',
            icon: 'pi pi-exclamation-triangle',
            acceptButtonStyleClass: 'p-button-danger p-button-text',
            rejectButtonStyleClass: 'p-button-text p-button-text',
            acceptIcon: 'none',
            rejectIcon: 'none',
            accept: () => {
                this.onDelete(orderId)
            },
        })
    }
    onDelete(orderId: string) {
        this.ordersService.deleteOrder(orderId).subscribe(
            () => {
                this._getOrders()
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Order is deleted!`,
                })
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Order is not deleted!',
                })
            }
        )
    }
    _getOrders() {
        this.orders$ = this.ordersService.getOrders()
    }
}
