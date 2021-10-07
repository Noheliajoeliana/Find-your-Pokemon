import React from "react"
import { NavLink } from "react-router-dom"

export default function Pokemon({poke}){
    let types = poke.types.map(t=> <p key={t.id}>{t.name}</p>)
    let img = poke.img || 'https://raw.githubusercontent.com/itsjavi/pokemon-assets/master/assets/svg/pokeball.svg'
    return (
        <NavLink to={`/details/${poke.id}`} >
        <div style={{border:'1px solid black'}}>
            <span>{poke.id}</span> 
            <h2>Poke {poke.name}</h2>
            <h3>Types:</h3>
            {types}
            <img src={img} alt="Imagen de poke"/>
        </div>
        </NavLink>
    )
}
