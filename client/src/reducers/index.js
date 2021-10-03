//ARCHIVO PRINCIPAL DE REDUCER
import {GET_POKEMONS, 
    GET_POKE_DETAILS, 
    GET_TYPES, 
    LOADING, 
    CREATE_POKEMON, 
    SORT_POKES_NAME, 
    SORT_POKES_FUERZA,
    CLEAR,
    FILTER_TYPES} from '../actions'
import { sortByName, sortByFuerza, filterTypes } from './helpers'

const initialState = {
    allPokemons: [],
    pokemons: [],
    pokeDetail: {},
    created: {},
    types: [],
    loading: {
        loading: false,
        msg: ''
    }
}

function Reducer(state = initialState, action){
    switch(action.type){
        case GET_POKEMONS:
            return {
                ...state,
                allPokemons: action.payload,
                pokemons: action.payload,
                loading: {
                    loading: false,
                    msg: ''
                }
            }
        case GET_POKE_DETAILS:
            return {
                ...state,
                pokeDetail: action.payload,
                loading: {
                    loading: false,
                    msg: ''
                }
    
            }
        case CREATE_POKEMON:
            return {
                ...state,
                created: action.payload,
                pokemons: [],
                allPokemons: [],
                loading: {
                    loading:false,
                    msg:''
                }
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        case LOADING:
            return {
                ...state,
                loading: {
                    loading: true,
                    msg: action.payload
                }
            }
        case SORT_POKES_NAME:
            return {
                ...state,
                pokemons: sortByName(state.pokemons,action.payload)
            }
        case SORT_POKES_FUERZA:
            return {
                ...state,
                pokemons: sortByFuerza(state.pokemons,action.payload)
            }
        case FILTER_TYPES:
            return {
                ...state,
                pokemons: filterTypes(state.allPokemons,action.payload)
            }
        case CLEAR:
            return{
                ...state,
                pokemons: [...state.allPokemons]
            }
        default:  
            return {...state}
    }
}


export default Reducer;