import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductItemComponent } from '../product-item/product-item.component'
import { ProductsService } from '../../services/products.service'
import { Observable } from 'rxjs'
import { Product } from '../../services/models/product'

@Component({
    selector: 'products-featured-products',
    standalone: true,
    imports: [CommonModule, ProductItemComponent],
    templateUrl: './featured-products.component.html',
    providers: [ProductsService],
})
export class FeaturedProductsComponent implements OnInit {
    products$: Observable<Product[]> | null = null
    constructor(private productsService: ProductsService) {}
    ngOnInit(): void {
        this.products$ = this.productsService.getFeaturedProducts()
    }
}
