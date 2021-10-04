import React from "react"
import { useState, useEffect } from "react"
import {  useSelector , useDispatch} from "react-redux"
import { clearAll, getAllPokemons, sortAlf, sortFuerza, getTypes, filterTypes} from "../../actions"
import Pokemon from '../Pokemon/Pokemon.jsx'



export default function Pokemons(params){
    
    const dispatch = useDispatch()

    const pokemons = useSelector(state => state.pokemons)
    const loading = useSelector(state => state.loading)

    
    useEffect(() => {
        if(!pokemons.length && !loading.loading){
            dispatch(getAllPokemons())
        }
    })
    
    let pokes = Array.isArray(pokemons) ? pokemons.map(poke => {
        return <Pokemon content={poke} />    
    }) : <p>{pokemons}</p>


    return(
        <div>
            <h1>Contenedor de muchos pokemones </h1>
            {loading.loading && loading.msg}
            {pokes}
        </div>
    )
}
