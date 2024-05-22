import { Component, OnInit } from '@angular/core'
import { CommonModule, Location } from '@angular/common'
import { ToolbarModule } from 'primeng/toolbar'
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { ToastModule } from 'primeng/toast'
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'

import { ActivatedRoute } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { MessageService } from 'primeng/api'
import { take, timer } from 'rxjs'

import { DropdownModule } from 'primeng/dropdown'
import { InputSwitchModule } from 'primeng/inputswitch'
import { User, UsersService } from '@org/users'
import { InputMaskModule } from 'primeng/inputmask'
@Component({
    selector: 'admin-users-form',
    standalone: true,
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        ToolbarModule,
        CardModule,
        ButtonModule,
        InputTextModule,
        ToastModule,
        InputSwitchModule,
        InputMaskModule,
        DropdownModule,
    ],
    templateUrl: './users-form.component.html',
    providers: [MessageService, UsersService],
})
export class UsersFormComponent implements OnInit {
    isSubmitted = false
    form!: FormGroup
    id = ''
    countries!: { id: string; name: string }[]
    editMode = false

    constructor(
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        private messageService: MessageService,
        private location: Location,
        private router: ActivatedRoute
    ) {}
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            isAdmin: [false],
            street: [''],
            apartment: [''],
            zip: [''],
            city: [''],
            country: [''],
        })

        this.router.params.subscribe((params) => {
            this.id = params['id']
            if (this.id) {
                this.editMode = true
                this.usersService.getUser(this.id).subscribe((user) => {
                    this.form.patchValue(user)
                    this.userForm['password'].setValidators([])
                    this.userForm['password'].updateValueAndValidity()
                })
            }
        })
        this._getCountries()
    }
    onSubmit() {
        this.isSubmitted = true
        if (!this.form.invalid) {
            if (this.editMode) {
                this._updateUser()
            } else {
                this._addUser()
            }
        }
    }

    cancel() {
        this.location.back()
    }
    private _getCountries() {
        this.countries = this.usersService.getCountries()
    }
    private _addUser() {
        this.usersService.addUser(this.form.value).subscribe(
            (user: User) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `User ${user.name}  is created!`,
                })

                timer(800)
                    .pipe(
                        take(1) // Limit to one emission
                    )
                    .subscribe(() => {
                        this.location.back()
                    })
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'User is not created!',
                })
            }
        )
    }
    private _updateUser() {
        this.usersService.updateUser(this.id, this.form.value).subscribe(
            (user: User) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `User ${user.name} is updated!`,
                })

                timer(800)
                    .pipe(
                        take(1) // Limit to one emission
                    )
                    .subscribe(() => {
                        this.location.back()
                    })
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'User is not updated !',
                })
            }
        )
    }
    get userForm() {
        return this.form.controls
    }
}
