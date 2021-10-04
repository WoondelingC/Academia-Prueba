import Swal from 'sweetalert2'

import { fileUpload } from '../helpers/fileUpload'
import { db } from '../firebase/firebase-config'
import {types} from '../types/types'
import { loadCard } from '../helpers/loadCards '


let fileUrl=[];

export const CardNew = (card) => {
    return async (dispatch, getSate) => {
        const uid = getSate().auth.uid

        const newCard = {
            title: card.title,
            categoria: card.categoria,
            description: card.description,
            priority: card.priority,
            url: fileUrl
        }
        const docRef = await db.collection(`${uid}/Card/data`).add(newCard)
        dispatch(addNewCard(docRef.id,newCard))
    }
}

export const Edit = (card) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        
        if (!card.url) {
            delete card.url;
        }

        const EditCard = {
            title: card.title,
            categoria: card.categoria,
            description: card.description,
            priority: card.priority,
            url: fileUrl
        }

        const cardFire = { ...EditCard  }
        delete cardFire.id

        Swal.fire({
            title: 'Cargando...',
            text: 'Please wait ...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading()
            }
        })

           await db.doc(`${uid}/Card/data/${card.id}`).update(EditCard)
           console.log(EditCard)

        Swal.fire('Saved', card.title, 'success');
        dispatch(ListarCard(uid))
    }
}

export const Delete = (id) => {
    return async (dispatch, getState) => {

        const uid = getState().auth.uid;

        await db.doc(`${uid}/Card/data/${id}`).delete();

        dispatch(deleteCard(id));
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Delete',
            showConfirmButton: false,
            timer: 1500
          })
          dispatch(ListarCard(uid))
    }
}

export const deleteCard = (id) => ({
    type: types.cardDelete,
    payload: id
});

export const startUploading = (file) => {
    return async (dispatch) => {

        Swal.fire({
            title: 'Cargando...',
            text: 'Please wait ...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading()
            }
        })

        fileUrl = await fileUpload(file)
        console.log(fileUrl)
        Swal.close()
    return fileUrl
    }
}

//FUNCIÓN SINCRÓNICA 

export const addNewCard = ( id, card ) => ({
    type: types.cardAddNew,
    payload: {
        id, ...card
    }
})

export const ListarCard = (uid) => {
    return async (dispatch) =>{
        const cards =  await loadCard(uid)
        dispatch(setCards(cards))
    }
}

export const setCards = (cards) => {
    return {
        type: types.cardLoad,
        payload: cards
    }
}

export const activeCard = (id,card) => {
    return{
        type:types.cardActive,
        payload:{
            id,
            ...card
        }
    }
}


export const clearCard = () => {
    return {
        type: types.cardLogoutClean
    }
}