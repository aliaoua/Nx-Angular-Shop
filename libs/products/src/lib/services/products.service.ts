import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Product } from './models/product'
import { environment } from '../../../../../environments/environment.development'
@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    apiUrlProducts = environment.apiUrl + 'products/'
    constructor(private http: HttpClient) {}

    getProducts(selectedCategories?: string[]) {
        let params = new HttpParams()
        if (selectedCategories) {
            params = params.append('categories', selectedCategories.join(','))
        }
        return this.http.get<Product[]>(this.apiUrlProducts, { params: params })
    }
    getProduct(id: string) {
        return this.http.get<Product>(this.apiUrlProducts + id)
    }
    addProduct(Product: FormData) {
        return this.http.post<Product>(this.apiUrlProducts, Product)
    }
    updateProduct(id: string, product: FormData) {
        return this.http.put<Product>(this.apiUrlProducts + id, product)
    }
    deleteProduct(id: string) {
        return this.http.delete<any>(this.apiUrlProducts + id)
    }
    getFeaturedProducts(count?: number) {
        return this.http.get<Product[]>(
            this.apiUrlProducts + 'get/featured/' + count
        )
    }
    uploadGalleryImages(formData: FormData, id: string) {
        return this.http.put<Product>(
            `${this.apiUrlProducts}/gallery-images/${id}`,
            formData
        )
    }
}
