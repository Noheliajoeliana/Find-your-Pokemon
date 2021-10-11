import axios from 'axios'

export const GET_POKEMONS = 'GET_POKEMONS'
export const GET_POKE_DETAILS = 'GET_POKE_DETAIL'
export const GET_POKE_NAME = 'GET_POKE_NAME'
export const CREATE_POKEMON = 'CREATE_POKEMON'
export const GET_TYPES = 'GET_TYPES'
export const SORT_POKES_NAME = 'SORT_POKES_NAME' 
export const SORT_POKES_FUERZA = 'SORT_POKES_FUERZA' 
export const FILTER_TYPES = 'FILTER_TYPES'
export const FILTER_DB_API = 'FILTER_DB_API'
export const CLEAR = 'CLEAR'
export const CLEAR_DETAIL = 'CLEAR_DETAIL'
export const LOADING = 'LOADING'


export function getAllPokemons(){
    return function(dispatch){
        dispatch({type: LOADING, payload: 'Buscando Pokémons...'})
        return axios.get('http://localhost:3001/pokemons')
                    .then(res=>res.data)
                    .then(data=> dispatch({type:GET_POKEMONS, payload:data}))
    }
}

export function getPokeDetail(id){
    return async function(dispatch){
        dispatch({type: LOADING, payload: 'Searching Pokémon...'})
        let respuesta
        try{
            respuesta = await axios.get(`http://localhost:3001/pokemons/${id}`)
        }catch(err){
            dispatch({type:GET_POKE_DETAILS,payload:'Pokemon Not Found'})
        }
        if(respuesta)
        return dispatch({type: GET_POKE_DETAILS, payload: respuesta.data})
    }
}

export function getPokeName(name){
    return async function(dispatch){
        dispatch({type: LOADING, payload: 'Searching Pokémon...'})
        let respuesta
        try{
            respuesta = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
        }catch(err){
            dispatch({type:GET_POKE_NAME, payload:`There are no Pokémons named: ${name[0].toUpperCase()+name.slice(1).toLowerCase()}`})
        }
        if(respuesta)
        return dispatch({type: GET_POKE_NAME, payload: respuesta.data})
    }
}

export function createPokemon(pokeObj){
    return function(dispatch){
        dispatch({type: LOADING, payload: 'Creating Pokémon...'})
        axios.post('http://localhost:3001/pokemons', pokeObj)
                    .then(response => response.data)
                    .then(data=> {
                        dispatch({type: CREATE_POKEMON, payload: data})
                    })
    }
}

export function getTypes(){
    return function(dispatch){
        axios.get('http://localhost:3001/types')
                .then(res=>res.data)
                .then(data => dispatch({type: GET_TYPES, payload: data}))
    }
}

export function sortAlf(tipo){
    return  {type: SORT_POKES_NAME, payload: tipo} //tipo puede ser 'A-Z' o 'Z-A'
}

export function sortFuerza(tipo){
    return  {type: SORT_POKES_FUERZA, payload: tipo} //tipo puede ser 'A-Z' o 'Z-A'
}

export function filterTypes(types){
    return {type: FILTER_TYPES, payload: types}
}

export function filterDB(dbAPI){
    return {type: FILTER_DB_API, payload: dbAPI}
}

export function clearAll(){
    return {type: CLEAR}
}

export function clearDetail(){
    return {type:CLEAR_DETAIL}
}