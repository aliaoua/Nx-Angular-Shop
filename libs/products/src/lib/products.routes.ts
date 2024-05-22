import { Routes } from '@angular/router'
import { ProductListComponent } from './pages/product-list/product-list.component'

import { ProductPageComponent } from './pages/product-page/product-page.component'

export const productsRoutes: Routes = [
    { path: 'products', component: ProductListComponent },
    { path: 'category/:categoryId', component: ProductListComponent },
    { path: 'products/:productId', component: ProductPageComponent },
]
