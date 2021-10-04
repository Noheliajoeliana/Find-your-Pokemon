import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPokeDetail } from "../../actions"
import { useEffect } from "react"

export default function PokeDetail(params){

    const dispatch = useDispatch()
    const pokemon = useSelector(state=>state.pokeDetail)
    const loading = useSelector(state=>state.loading)
    
    useEffect(() => {
        if(pokemon.id!==params.props.match.params.id && !loading.loading){
            dispatch(getPokeDetail(params.props.match.params.id))
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