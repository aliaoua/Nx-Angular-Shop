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
import {
    CategoriesService,
    Category,
    Product,
    ProductsService,
} from '@org/products'

import { ActivatedRoute } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { MessageService } from 'primeng/api'
import { take, timer } from 'rxjs'
import { ColorPickerModule } from 'primeng/colorpicker'
import { DropdownModule } from 'primeng/dropdown'
import { InputNumberModule } from 'primeng/inputnumber'
import { InputSwitchModule } from 'primeng/inputswitch'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { EditorModule } from 'primeng/editor'
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload'

@Component({
    selector: 'admin-products-form',
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
        DropdownModule,
        InputNumberModule,
        InputSwitchModule,
        InputTextareaModule,
        EditorModule,
        FileUploadModule,
    ],
    templateUrl: './products-form.component.html',

    providers: [ProductsService, MessageService, CategoriesService],
})
export class ProductsFormComponent implements OnInit {
    uploadedFiles: any[] = []
    imageUrl = ''
    formDataGallery = new FormData()

    isSubmitted = false
    form!: FormGroup
    id = ''
    product!: Product
    editMode = false
    productsNames!: Category[]
    constructor(
        private formBuilder: FormBuilder,
        private productsService: ProductsService,
        private messageService: MessageService,
        private location: Location,
        private router: ActivatedRoute,
        private categoriesService: CategoriesService
    ) {}

    ngOnInit(): void {
        this._getCategories()
        this._initForm()

        this.router.params.subscribe((params) => {
            this.id = params['id']
            if (this.id) {
                this.editMode = true
                this.productsService.getProduct(this.id).subscribe((prod) => {
                    this.form.patchValue(prod)

                    if (prod.category) {
                        this.form.controls['category'].setValue(
                            prod.category.id
                        )
                    }
                    if (prod.image) {
                        this.imageUrl = prod.image
                    }

                    if (prod.richDescription && this.form) {
                        this.productForm['richDescription'].setValue(
                            prod.richDescription
                        )
                    }
                })
            }
        })
    }

    onUpload(event: FileUploadEvent) {
        const file = event.files[0]
        this.form.patchValue({ image: file })

        this.messageService.add({
            severity: 'info',
            summary: 'File Uploaded',
            detail: '',
        })
    }
    onUploadImages(event: FileUploadEvent) {
        for (const file of event.files) {
            this.formDataGallery.append('images', file)
        }
    }
    onSubmit() {
        this.isSubmitted = true

        if (!this.form.invalid) {
            const productFormData = new FormData()
            Object.keys(this.productForm).map((key) => {
                productFormData.append(key, this.productForm[key].value)
            })
            if (this.editMode) {
                this._updateProduct(productFormData)
                this._uploadGalleryImages()
            }
            if (!this.editMode) {
                this._addProduct(productFormData)
            }
        }
    }
    private _uploadGalleryImages() {
        this.productsService
            .uploadGalleryImages(this.formDataGallery, this.id)
            .subscribe(
                (product: Product) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: `Product ${product.name} images uploaded successfully!`,
                    })
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error uploading product images!',
                    })
                }
            )
    }
    private _initForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            brand: ['', Validators.required],
            price: ['', Validators.required],
            category: ['', Validators.required],
            countInStock: ['', Validators.required],
            description: ['', Validators.required],
            richDescription: [''],
            image: ['', Validators.required],

            isFeatured: [false],
        })
    }
    cancel() {
        this.location.back()
    }
    private _getCategories() {
        this.categoriesService.getCategories().subscribe((prds) => {
            this.productsNames = prds
        })
    }
    _addProduct(productForm: FormData) {
        this.productsService.addProduct(productForm).subscribe(
            (product: Product) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `product ${product.name}  is created!`,
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
                    detail: 'Product is not created!',
                })
            }
        )
    }
    private _updateProduct(productForm: FormData) {
        this.productsService.updateProduct(this.id, productForm).subscribe(
            (product: Product) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Product ${product.name} is updated!`,
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
                    detail: 'Product is not updated !',
                })
            }
        )
    }
    get productForm() {
        return this.form.controls
    }
}
