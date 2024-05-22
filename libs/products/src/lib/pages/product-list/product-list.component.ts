import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductItemComponent } from '../../components/product-item/product-item.component'
import { Product } from '../../services/models/product'
import { ProductsService } from '../../services/products.service'
import { HttpClientModule } from '@angular/common/http'
import { CategoriesService } from '../../services/categories.service'
import { CheckboxModule } from 'primeng/checkbox'
import { FormsModule } from '@angular/forms'
import { Category } from '../../services/models/category'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'product-list',
    standalone: true,
    imports: [
        CommonModule,
        ProductItemComponent,
        HttpClientModule,
        CheckboxModule,
        FormsModule,
    ],
    templateUrl: './product-list.component.html',
    providers: [ProductsService, CategoriesService],
})
export class ProductListComponent implements OnInit {
    products: Product[] = []
    categories: Category[] = []
    isCategoruPage!: boolean
    categoryId = ''
    constructor(
        private productsService: ProductsService,
        private categoriesService: CategoriesService,
        private route: ActivatedRoute
    ) {}
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            params['categoryId']
                ? this._getProducts([params['categoryId']])
                : this._getProducts()
            params['categoryId']
                ? (this.isCategoruPage = true)
                : (this.isCategoruPage = false)
        })
        this._getCategories()
    }

    private _getProducts(selectedCategories?: string[]) {
        this.productsService
            .getProducts(selectedCategories)
            .subscribe((resProducts) => {
                this.products = resProducts
            })
    }

    private _getCategories() {
        this.categoriesService.getCategories().subscribe((resCats) => {
            this.categories = resCats
        })
    }

    categoryFilter() {
        const selectedCategories = this.categories
            .filter((category) => category.checked === true)
            .map((category) => category.id)
            .filter((id): id is string => typeof id === 'string')
        this._getProducts(selectedCategories)
    }
}
