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
import { User, UsersService } from '@org/users'
import { Observable } from 'rxjs'
import { TagModule } from 'primeng/tag'
import { TCountryCode } from 'countries-list'
@Component({
    selector: 'admin-users-list',
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
    templateUrl: './users-list.component.html',
    providers: [MessageService, ConfirmationService, UsersService],
})
export class UsersListComponent implements OnInit {
    users$: Observable<User[]> | null = null
    constructor(
        private usersService: UsersService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}
    ngOnInit(): void {
        this._getUsers()
    }
    getCountryName(countryCode: TCountryCode) {
        return this.usersService.getCountryName(countryCode)
    }
    showDeleteConfirmation(userId: string): void {
        this.confirmationService.confirm({
            message: 'Do you want to delete this User?',
            header: 'Delete User',
            icon: 'pi pi-exclamation-triangle',
            acceptButtonStyleClass: 'p-button-danger p-button-text',
            rejectButtonStyleClass: 'p-button-text p-button-text',
            acceptIcon: 'none',
            rejectIcon: 'none',
            accept: () => {
                this.onDelete(userId)
            },
        })
    }
    onDelete(userId: string) {
        this.usersService.deleteUser(userId).subscribe(
            () => {
                this._getUsers()
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `User is deleted!`,
                })
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'User is not deleted!',
                })
            }
        )
    }
    private _getUsers() {
        this.users$ = this.usersService.getUsers()
    }
}
