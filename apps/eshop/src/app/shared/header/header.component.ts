import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavComponent } from '../nav/nav.component'
import { InputTextModule } from 'primeng/inputtext'
import { FormsModule } from '@angular/forms'
import { ProductsSearchComponent } from '@org/products'
import { CartIconComponent } from '@org/orders'
@Component({
    selector: 'eshop-header',
    standalone: true,
    imports: [
        CommonModule,
        NavComponent,
        InputTextModule,
        FormsModule,
        ProductsSearchComponent,
        CartIconComponent,
    ],
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    value1 = 1
}
