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
    return function(dispatch){
        dispatch({type: LOADING, payload: 'Buscando Pokémon...'})
        return axios.get(`http://localhost:3001/pokemons/${id}`)
                    .then(res=>res.data)
                    .then(res=>dispatch({type: GET_POKE_DETAILS, payload: res}))
    }
}

export function getPokeName(name){
    return function(dispatch){
        dispatch({type: LOADING, payload: 'Buscando Pokémon...'})
        return axios.get(`http://localhost:3001/pokemons?name=${name}`)
                    .then(res=>res.data)
                    .then(res=>dispatch({type: GET_POKE_NAME, payload: res}))
    }
}

export function createPokemon(pokeObj){
    return function(dispatch){
        dispatch({type: LOADING, payload: 'Posteando Pokémon...'})
        axios.post('http://localhost:3001/pokemons', pokeObj)
                    .then(response => response.data)
                    .then(data=> {
                        console.log('data:',data)
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
    return {type: CLEAR, payload:''}
}