import { createReducer, on, Action, ActionReducerMap } from '@ngrx/store'

import * as UsersActions from './users.actions'

import { User } from '../models/users'
import * as fromUsers from './users.reducer'
export const USERS_FEATURE_KEY = 'users'

export interface AppState {
    [fromUsers.USERS_FEATURE_KEY]: fromUsers.UsersState
}
export const appReducers: ActionReducerMap<AppState> = {
    [fromUsers.USERS_FEATURE_KEY]: fromUsers.reducer,
}

export interface UsersState {
    user: User | null
    isAuthenticated: boolean
}
export interface UsersPartialState {
    readonly [USERS_FEATURE_KEY]: UsersState
}

export const initialUserState: UsersState = {
    user: null,
    isAuthenticated: false,
}

const usersReducer = createReducer(
    initialUserState,
    on(UsersActions.buildUserSession, (state) => ({ ...state })), // No change to user or isAuthenticated
    on(UsersActions.buildUserSessionSuccess, (state, action) => ({
        ...state,
        user: action.user,
        isAuthenticated: true,
    })),
    on(UsersActions.buildUserSessionFailure, (state, action) => ({
        ...state,
        user: null,
        isAuthenticated: false,
    }))
)

export function reducer(state: UsersState | undefined, action: Action) {
    return usersReducer(state, action)
}
