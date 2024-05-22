import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { ToastModule } from 'primeng/toast'
import { HttpClientModule } from '@angular/common/http'
import { LocalsStorageService } from '../../services/localsStorage.service'
import { Router } from '@angular/router'
@Component({
    selector: 'users-login',
    standalone: true,
    imports: [
        CommonModule,
        InputTextModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        HttpClientModule,
    ],
    templateUrl: './login.component.html',

    providers: [AuthService],
})
export class LoginComponent implements OnInit {
    loginFormGroup!: FormGroup
    isSubmitted = false
    error = ''
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private localsstorageService: LocalsStorageService,
        private router: Router
    ) {}
    ngOnInit(): void {
        this._initLoginForm()
    }
    onSubmit() {
        this.isSubmitted = true
        this.authService.login(this.loginFormGroup.value).subscribe(
            (response) => {
                if (response.token) {
                    this.localsstorageService.setToken(response.token)
                    this.router.navigate(['/'])
                }
            },
            (error) => {
                this.error = error.error
            }
        )
    }
    _initLoginForm() {
        this.loginFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        })
    }
    get loginForm() {
        return this.loginFormGroup.controls
    }
}
