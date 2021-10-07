import React, { useEffect } from "react"
import { useSelector, useDispatch} from "react-redux"
import {getAllPokemons} from "../../actions"
import Pokemon from '../Pokemon/Pokemon.jsx'
import Page from "../Page/Page"



export default function Pokemons({page, clickPage}){
    
    const dispatch = useDispatch()

    const pokemons = useSelector(state => state.pokemons)
    const loading = useSelector(state => state.loading)

    
    useEffect(() => {
        if(!pokemons.length && !loading.loading){
            dispatch(getAllPokemons())
        }
    })
    
    

    let pokesPerPage 
    if(page===1){
        pokesPerPage = pokemons.slice(0,9)
    }else {
        pokesPerPage = pokemons.slice(page*12-15,page*12-3)

    }

    let pokes = Array.isArray(pokesPerPage) ? pokesPerPage.map(poke => {
        return <Pokemon key={poke.id} poke={poke} />    
    }) : <p>{pokemons}</p>


    return(
        <div>
            <h1>Contenedor de muchos pokemones </h1>
            {loading.loading && loading.msg}
            {pokes}
            {Array.isArray(pokemons) && pokesPerPage.length > 5 && <Page cantPokes = {pokemons.length} clickPage={clickPage}/>}
        </div>
    )
}
