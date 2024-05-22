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
import { CategoriesService, Category } from '@org/products'
import { ActivatedRoute } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { MessageService } from 'primeng/api'
import { take, timer } from 'rxjs'
import { ColorPickerModule } from 'primeng/colorpicker'
@Component({
    selector: 'admin-categories-form',
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
        ColorPickerModule,
    ],
    templateUrl: './categories-form.component.html',

    providers: [CategoriesService, MessageService],
})
export class CategoriesFormComponent implements OnInit {
    isSubmitted = false
    form!: FormGroup
    id = ''
    category!: Category
    editMode = false

    constructor(
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private location: Location,
        private router: ActivatedRoute
    ) {}
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            icon: ['', Validators.required],
            color: ['', Validators.required],
        })

        this.router.params.subscribe((params) => {
            this.id = params['id']
            if (this.id) {
                this.editMode = true
                this.categoriesService
                    .getCategory(this.id)
                    .subscribe((cate) => {
                        this.form.patchValue(cate)
                    })
            }
        })
    }
    onSubmit() {
        this.isSubmitted = true
        if (!this.form.invalid) {
            if (this.editMode) {
                this._updateCategory()
            } else {
                this._addCategory()
            }
        }
    }

    cancel() {
        this.location.back()
    }
    private _addCategory() {
        this.categoriesService.addCategory(this.form.value).subscribe(
            (category: Category) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Category ${category.name}  is created!`,
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
                    detail: 'Category is not created!',
                })
            }
        )
    }
    private _updateCategory() {
        this.categoriesService
            .updateCategory(this.id, this.form.value)
            .subscribe(
                (category: Category) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: `Category ${category.name} is updated!`,
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
                        detail: 'Category is not updated !',
                    })
                }
            )
    }
    get categoryForm() {
        return this.form.controls
    }
}
