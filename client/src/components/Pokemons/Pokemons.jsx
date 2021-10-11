import React, { useEffect } from "react"
import { useSelector, useDispatch} from "react-redux"
import {getAllPokemons} from "../../actions"
import Pokemon from '../Pokemon/Pokemon.jsx'
import Page from "../Page/Page"
import clases from './Pokemons.module.css'
import NotFound from '../../Imagenes/notFound.png'



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
    }) : <div >
            <p className={clases.msg}>{pokemons}</p>
            <img className={clases.notFound} src={NotFound} alt="" />
        </div> 


    return(
        <div className={clases.pokemons} >
            {Array.isArray(pokemons) && pokemons.length > 9 
            && <Page cantPokes = {pokemons.length} clickPage={clickPage} page={page}/>}

            {loading.loading && 
            <div className={clases.loading}>
                <span className={clases.msg}>{loading.msg}</span>
                <img className={clases.loadingimg} src='https://raw.githubusercontent.com/itsjavi/pokemon-assets/master/assets/svg/pokeball.svg' alt="" />
            </div>}
            {pokes}
        </div>
    )
}
