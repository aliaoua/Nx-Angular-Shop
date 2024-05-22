import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Category } from './models/category'
@Injectable({
    providedIn: 'root',
})
export class CategoriesService {
    constructor(private http: HttpClient) {}

    getCategories() {
        return this.http.get<Category[]>(
            'http://localhost:5000/api/v1/categories'
        )
    }
    getCategory(id: string) {
        return this.http.get<Category>(
            `http://localhost:5000/api/v1/categories/${id}`
        )
    }
    addCategory(category: Category) {
        return this.http.post<Category>(
            'http://localhost:5000/api/v1/categories',
            category
        )
    }
    updateCategory(id: string, category: Category) {
        return this.http.put<Category>(
            `http://localhost:5000/api/v1/categories/${id}`,
            category
        )
    }
    deleteCategory(id: string) {
        return this.http.delete<any>(
            `http://localhost:5000/api/v1/categories/${id}`
        )
    }
}
