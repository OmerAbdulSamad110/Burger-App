import * as actionTypes from './actionTypes';
import axios from '../../axios-auth';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: authData.idToken,
        userId: authData.localId || authData.userId,
        refreshToken: authData.refreshToken,
        expiresIn: authData.expiresIn,
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('user');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const checkAuthTimeout = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expiresIn * 1000)
    }
}

export const auth = (authData) => {
    return dispatch => {
        authData['returnSecureToken'] = true;
        dispatch(authStart());
        let url = 'accounts:signUp?key=';
        if (!authData.isSignup) {
            url = 'accounts:signInWithPassword?key='
        }
        axios.post(url + 'AIzaSyA6auKeQrk2TJ1ivrasUfH-x6HryTX7kq8', authData)
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem('user', JSON.stringify({
                        idToken: response.data.idToken,
                        expiresIn: new Date(new Date().getTime() + response.data.expiresIn * 1000),
                        refreshToken: response.data.refreshToken,
                        userId: response.data.localId
                    }))
                    dispatch(authSuccess(response.data));
                    dispatch(checkAuthTimeout(response.data.expiresIn));
                }
            })
            .catch(error => {
                if (error.response) {
                    dispatch(authFailed(error.response.data.error));
                }
            });
    }
}


export const checkAuthStatus = () => {
    return dispatch => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            if (new Date(user.expiresIn) <= new Date()) {
                dispatch(logout());
            }
            else {
                user.expiresIn =
                    (new Date(user.expiresIn).getTime() - new Date().getTime()) / 1000;
                dispatch(authSuccess(user));
                dispatch(checkAuthTimeout(user.expiresIn));
            }
        }
    }
}