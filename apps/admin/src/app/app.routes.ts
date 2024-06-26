import { Route } from '@angular/router'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { ShellComponent } from './shared/shell/shell.component'
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component'
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component'
import { ProductsListComponent } from './pages/products/products-list/products-list.component'
import { ProductsFormComponent } from './pages/products/products-form/products-form.component'
import { UsersListComponent } from './pages/users/users-list/users-list.component'
import { UsersFormComponent } from './pages/users/users-form/users-form.component'
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component'
import { OrderDetailsComponent } from './pages/orders/order-details/order-details.component'
import { isAdminGuard, usersRoutes } from '@org/users'

export const appRoutes: Route[] = [
    {
        path: '',
        component: ShellComponent,
        canActivate: [isAdminGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            {
                path: 'categories',
                component: CategoriesListComponent,
            },
            {
                path: 'categories/form',
                component: CategoriesFormComponent,
            },
            {
                path: 'categories/form/:id',
                component: CategoriesFormComponent,
            },
            {
                path: 'products',
                component: ProductsListComponent,
            },
            {
                path: 'products/form',
                component: ProductsFormComponent,
            },
            {
                path: 'products/form/:id',
                component: ProductsFormComponent,
            },
            {
                path: 'users',
                component: UsersListComponent,
            },
            {
                path: 'users/form',
                component: UsersFormComponent,
            },
            {
                path: 'users/form/:id',
                component: UsersFormComponent,
            },
            { path: 'orders', component: OrdersListComponent },
            { path: 'orders/detail/:id', component: OrderDetailsComponent },
        ],
    },
    ...usersRoutes,
    { path: '**', redirectTo: '', pathMatch: 'full' },
]
