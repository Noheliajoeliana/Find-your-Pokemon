import React from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getPokeDetail } from "../../actions"
import { useEffect } from "react"

export default function PokeDetail({id}){

    const dispatch = useDispatch()
    const pokemon = useSelector(state=>state.pokeDetail)
    const loading = useSelector(state=>state.loading)
    
    console.log(pokemon)

    useEffect(() => {
        if(pokemon.id!==id && !loading.loading){
            dispatch(getPokeDetail(id))
        }
    })
    
    let types
    if(pokemon.types){
        types = pokemon.types.map(t=>{
            return <span>{t.name} </span>
        })
    }
    return (
        <div>
            <Link to='/home'>X</Link>
            {loading.loading && loading.msg }
            {!loading.loading && pokemon.name &&
            <div>
                <h1>PokeDetail {pokemon.name}</h1>
                <h2>Altura: {pokemon.height}</h2>
                <h2>Peso: {pokemon.weight}</h2>
                <h2>Puntos de vida: {pokemon.hp}</h2>
                <h2>Ataque: {pokemon.attack}</h2>
                <h2>Defensa: {pokemon.defense}</h2>
                <h2>Velocidad: {pokemon.speed}</h2>
                <h2>Tipos: {types}</h2>
                <img src={pokemon.img} alt="" />
                <img src={pokemon.gif} alt="" /> 
            </div>}
        </div>
    )
}