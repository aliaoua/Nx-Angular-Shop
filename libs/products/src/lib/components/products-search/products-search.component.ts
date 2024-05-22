import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InputTextModule } from 'primeng/inputtext'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'lib-products-search',
    standalone: true,
    imports: [CommonModule, InputTextModule, FormsModule],
    templateUrl: './products-search.component.html',
    styles: ``,
})
export class ProductsSearchComponent {
    value1 = 1
}
