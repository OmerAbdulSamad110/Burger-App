import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'

const initialState = {
    token: null,
    refreshToken: null,
    expiresIn: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

function authStart(state, action) {
    return updateObject(state, {
        error: null,
        loading: true
    })
}

function authSuccess(state, action) {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        refreshToken: action.refreshToken,
        expiresIn: +action.expiresIn,
        error: null,
        loading: false
    })
}

function authFailed(state, action) {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

function authLogout(state, action) {
    return updateObject(state, {
        token: null,
        refreshToken: null,
        expiresIn: null,
        userId: null
    })
}

function setAuthRedirectPath(state, action) {
    return updateObject(state, {
        authRedirectPath: action.path
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAILED:
            return authFailed(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action);
        default:
            return state;
    }
}

export default reducer;