import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'
import { appRoutes } from './app.routes'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideStore } from '@ngrx/store'
import { provideEffects } from '@ngrx/effects'
import { UsersEffects } from '@org/users'
import * as fromUsers from 'libs/users/src/lib/state/users.reducer'
import { UsersFacade, jwtInterceptorInterceptor } from '@org/users'
import {
    HTTP_INTERCEPTORS,
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http'
import { NgxStripeModule } from 'ngx-stripe'
export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes),
        provideAnimations(),
        importProvidersFrom(
            NgxStripeModule.forRoot(
                'pk_test_51PItda02DoTn2WiKb5mDaEeYtQLm3txrPL7iKjuB2r8xIFyLALtlTQntYqicLiPvUF5uHdj7BvykOxNRArX3GjSf00S3Cb2j6c'
            )
        ),
        provideHttpClient(withInterceptorsFromDi()),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: jwtInterceptorInterceptor,
            multi: true,
        },
        provideStore({ users: fromUsers.reducer }),
        provideEffects(UsersEffects),
        UsersFacade,
    ],
}
