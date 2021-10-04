import { types } from '../types/types';

const initialState = {
    movie: [],
    search: []
}

export const moviesReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.Listar:
            return {
                state,
                movies: [...action.payload]
            }
        case types.ListarBusqueda:
            return {
                ...state,
                search: [...action.payload]
            }

        default:
            return state;
    }
}