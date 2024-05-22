import { Injectable } from '@angular/core'
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { LocalsStorageService } from './localsStorage.service'
import { environment } from '../../../../../environments/environment.development'

@Injectable()
export class jwtInterceptorInterceptor implements HttpInterceptor {
    constructor(private localsstorageService: LocalsStorageService) {}
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const isApiUrl = request.url.startsWith(environment.apiUrl)
        const token = this.localsstorageService.getToken()
        if (token && isApiUrl) {
            const authReq = request.clone({
                headers: request.headers.set(
                    'Authorization',
                    `Bearer ${token} `
                ),
            })
            return next.handle(authReq)
        } else {
            return next.handle(request)
        }
    }
}
