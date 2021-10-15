import React from "react"
import { Link } from "react-router-dom"
import clases from './Pokemon.module.css'

export default function Pokemon({poke}){
    let types = poke.types.map(t=> <p className={clases.type} key={t.id}>{t.name[0].toUpperCase()+t.name.slice(1)}</p>)

    let pokeID = poke.id.length > 7 ? 'Created' : `#${poke.id}`
    let pokeName = poke.name[0].toUpperCase()+poke.name.slice(1)

    
    return (
        <div className={`${clases.pokeCard} ${clases[poke.types[0].name]}`}>
            <Link to={`/details/${poke.id}`} >
                <div className={clases.top}>
                    <span className={clases.id}>{pokeID}</span> 
                    <h2 className={clases.name}>{pokeName}</h2>
                </div>
                
                <div className={clases.info}>
                    <img className={clases.mainImg} src={poke.img} alt="Imagen de poke"/>
                    <div className={clases.types}>
                        <h2 className={clases.typestitle}>Types:</h2>
                        <div className={clases.typesname}>
                            {types}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
