import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Product, ProductsService } from '@org/products'

import { HttpClientModule } from '@angular/common/http'
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { ToolbarModule } from 'primeng/toolbar'
import { CardModule } from 'primeng/card'
import { RouterModule } from '@angular/router'
import { ToastModule } from 'primeng/toast'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { PaginatorModule } from 'primeng/paginator'
@Component({
    selector: 'admin-products-list',
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
        PaginatorModule,
    ],
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.css',
    providers: [ProductsService, MessageService, ConfirmationService],
})
export class ProductsListComponent implements OnInit {
    products!: Product[]
    constructor(
        private productsService: ProductsService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}
    ngOnInit() {
        this._getProducts()
    }
    private _getProducts() {
        this.productsService.getProducts().subscribe((prods) => {
            this.products = prods
        })
    }

    showDeleteConfirmation(categoryId: string): void {
        this.confirmationService.confirm({
            message: 'Do you want to delete this Category?',
            header: 'Delete Category',
            icon: 'pi pi-exclamation-triangle',
            acceptButtonStyleClass: 'p-button-danger p-button-text',
            rejectButtonStyleClass: 'p-button-text p-button-text',
            acceptIcon: 'none',
            rejectIcon: 'none',
            accept: () => {
                this.onDelete(categoryId)
            },
        })
    }

    onDelete(id: string) {
        this.productsService.deleteProduct(id).subscribe(
            () => {
                this._getProducts()
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Product is deleted!`,
                })
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Product is not deleted!',
                })
            }
        )
    }
}
