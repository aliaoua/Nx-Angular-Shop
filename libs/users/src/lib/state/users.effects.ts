import { Injectable, inject } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { switchMap, catchError, of, map, exhaustMap } from 'rxjs'
import * as UsersActions from './users.actions'

import { LocalsStorageService } from '../services/localsStorage.service'
import { UsersService } from '../services/users.service'

@Injectable()
export class UsersEffects {
    private actions$ = inject(Actions)
    private localStorageService = inject(LocalsStorageService)
    private usersService = inject(UsersService)
    buildUsersSession$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.buildUserSession),
            exhaustMap(() => {
                if (this.localStorageService.isValidToken()) {
                    const userId = this.localStorageService.getUserIdFromToken()
                    if (userId) {
                        return this.usersService.getUser(userId).pipe(
                            map((user) =>
                                UsersActions.buildUserSessionSuccess({ user })
                            ),
                            catchError((error) => {
                                console.error('Error', error)
                                return of(
                                    UsersActions.buildUserSessionFailure({
                                        error,
                                    })
                                )
                            })
                        )
                    }
                }
                // If token is not valid or userId is not found, return failure action
                return of(
                    UsersActions.buildUserSessionFailure({
                        error: 'Invalid token',
                    })
                )
            }),
            catchError((error) => {
                console.error('Error', error)
                return of(UsersActions.buildUserSessionFailure({ error }))
            })
        )
    )
}
