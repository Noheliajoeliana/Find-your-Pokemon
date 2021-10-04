//ARCHIVO PRINCIPAL DE REDUCER
import {GET_POKEMONS, 
    GET_POKE_DETAILS, 
    GET_TYPES, 
    LOADING, 
    CREATE_POKEMON, 
    SORT_POKES_NAME, 
    SORT_POKES_FUERZA,
    CLEAR,
    FILTER_TYPES,
    FILTER_DB_API,
    GET_POKE_NAME} from '../actions'
import { sortByName, sortByFuerza, filterTypes, filterDB } from './helpers'

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
                },
                pokemons: [...state.allPokemons]
    
            }
        case GET_POKE_NAME:
            return {
                ...state,
                pokemons: action.payload,
                loading: {
                    loading: false,
                    msg: ''
                }
            }
        case CREATE_POKEMON:
            console.log('cree este poke: en reducer',action.payload)
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
                },
                pokemons: []
            }
        case SORT_POKES_NAME:
            console.log(state.allPokemons)
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
            let filtrado1 = filterTypes(state.allPokemons,action.payload)
            return {
                ...state,
                pokemons:  filtrado1.length ? filtrado1 : 'No hay pokemones que coincidan'
            }
        case FILTER_DB_API:
            let filtrado2 = filterDB(state.allPokemons,action.payload)
            return {
                ...state,
                pokemons: filtrado2.length ? filtrado2 : 'No hay pokemones que coincidan'
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