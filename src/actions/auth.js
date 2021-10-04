import { firebase, googleAuthProvider,  provider } from '../firebase/firebase-config';
import { types } from '../types/types';

import { startLoading, finishLoading } from './uiError';
import Swal from 'sweetalert2'

export const startGoogleLogin = () => {
    return (dispatch) => {

        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(startLoading())
                dispatch(
                    login(user.uid, user.displayName)
                    
                )
            });

    }
}

export const startFacebookLogin = () => {
    return (dispatch) => {

        firebase.auth().signInWithPopup(provider)
            .then(({ user }) => {
                dispatch(startLoading())
                dispatch(
                    login(user.uid, user.displayName)
                    
                )
            });

    }
}


export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(startLoading())
                dispatch(login(user.uid, user.displayName));
            })
            .catch(e => {
                console.log(e);
                dispatch(finishLoading)
            })
    }
}


export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {

                await user.updateProfile({ displayName: name });

                dispatch(
                    login(user.uid, user.displayName)
                );
                console.log(user)
                Swal.fire({
                    position: 'top-end',
                    text: 'Usuario Creaso',
                    icon: 'success',
                    title:  user.displayName,
                    showConfirmButton: false,
                    timer: 1500
                  })
            })
            .catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: e,
                    footer: ''
                  })

            })

    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});


export const startLogout = () => {
    return async( dispatch ) => {
        await firebase.auth().signOut();
        dispatch( logout() );
    }
}


export const logout = () => ({
    type: types.logout
})