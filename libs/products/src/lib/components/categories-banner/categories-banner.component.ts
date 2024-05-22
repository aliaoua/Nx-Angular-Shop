import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategoriesService } from '../../services/categories.service'
import { Observable } from 'rxjs'
import { Category } from '../../services/models/category'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'products-categories-banner',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './categories-banner.component.html',
    providers: [CategoriesService],
})
export class CategoriesBannerComponent implements OnInit {
    categories$: Observable<Category[]> | null = null
    constructor(private categoriesService: CategoriesService) {}
    ngOnInit(): void {
        this.categories$ = this.categoriesService.getCategories()
    }
}
