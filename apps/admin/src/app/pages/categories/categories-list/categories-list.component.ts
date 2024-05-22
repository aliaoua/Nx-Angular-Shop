import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategoriesService, Category } from '@org/products'

import { HttpClientModule } from '@angular/common/http'
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { ToolbarModule } from 'primeng/toolbar'
import { CardModule } from 'primeng/card'
import { RouterModule } from '@angular/router'
import { ToastModule } from 'primeng/toast'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { Subscription } from 'rxjs'
@Component({
    selector: 'admin-categories-list',
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
    ],
    templateUrl: './categories-list.component.html',
    styleUrl: './categories-list.component.scss',
    providers: [CategoriesService, MessageService, ConfirmationService],
})
export class CategoriesListComponent implements OnInit, OnDestroy {
    categories: Category[] | null = null
    private categoriesSubscription: Subscription | undefined
    private deleteSubscription: Subscription | undefined
    constructor(
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}
    ngOnInit(): void {
        this._getCategories()
    }
    private _getCategories() {
        this.categoriesSubscription = this.categoriesService
            .getCategories()

            .subscribe((categ) => (this.categories = categ))
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
    onDelete(categoryId: string) {
        this.deleteSubscription = this.categoriesService
            .deleteCategory(categoryId)
            .subscribe(
                () => {
                    this._getCategories()
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: `Category is deleted!`,
                    })
                },
                () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Category is not deleted!',
                    })
                }
            )
    }
    ngOnDestroy(): void {
        if (this.categoriesSubscription) {
            this.categoriesSubscription.unsubscribe()
        }
        if (this.deleteSubscription) {
            this.deleteSubscription.unsubscribe()
        }
    }
}
