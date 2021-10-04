import {types} from "../types/types";

const initialState = {
    auth:{}
}

//un reducer va a ser una funcion que siempre va a retornar un estado
export const authReducer = (state = initialState, action) =>{
    //siempre las acciones se llamaran por un switch
    switch(action.type) {
        case types.login:
            return{
                uid: action.payload.uid,//genera un codigo unico del usuario
                name: action.payload.displayName//nombre de usuario
            }
        case types.logout:
            return { }//se le indica que borre la informacion

        default:
            return state;
    }
}