import React from "react"
import {useEffect } from "react"
import {  useSelector , useDispatch} from "react-redux"
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
    
    

    let pokesPerPage = pokemons.slice(page*9-9,page*9)

    let pokes = Array.isArray(pokesPerPage) ? pokesPerPage.map(poke => {
        return <Pokemon content={poke} />    
    }) : <p>{pokemons}</p>


    return(
        <div>
            <h1>Contenedor de muchos pokemones </h1>
            {loading.loading && loading.msg}
            {pokes}
            {Array.isArray(pokemons) && <Page cantPokes = {pokemons.length} clickPage={clickPage}/>}
        </div>
    )
}
