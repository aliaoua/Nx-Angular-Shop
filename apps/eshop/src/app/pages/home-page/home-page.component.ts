import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AccordionModule } from 'primeng/accordion'
import { BannerComponent } from '@org/ui'
import {
    CategoriesBannerComponent,
    FeaturedProductsComponent,
} from '@org/products'
import { HttpClientModule } from '@angular/common/http'

@Component({
    selector: 'eshop-home-page',
    standalone: true,
    imports: [
        CommonModule,
        AccordionModule,
        BannerComponent,
        CategoriesBannerComponent,
        HttpClientModule,
        FeaturedProductsComponent,
    ],
    templateUrl: './home-page.component.html',
})
export class HomePageComponent {}
