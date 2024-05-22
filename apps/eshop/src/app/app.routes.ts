import { Route } from '@angular/router'

import { HomePageComponent } from './pages/home-page/home-page.component'
import { productsRoutes } from '@org/products'
import {
    CartPageComponent,
    CheckoutPageComponent,
    ThankYouComponent,
} from '@org/orders'
import { isAdminGuard, usersRoutes } from '@org/users'
export const appRoutes: Route[] = [
    { path: '', component: HomePageComponent },
    { path: 'cart', component: CartPageComponent },
    {
        path: 'checkout',
        canActivate: [isAdminGuard],
        component: CheckoutPageComponent,
    },
    { path: 'success', component: ThankYouComponent },
    ...usersRoutes,
    ...productsRoutes,
]
