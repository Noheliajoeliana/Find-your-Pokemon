import React from "react"
import Pokemons from "../Pokemons/Pokemons"
import { Link } from "react-router-dom"

export default function Home(params){


    return (
        <div>
            <h1>Pokemones</h1>
            <Link to='/create'><button>Crear pokemon</button></Link>
            <Pokemons/>
        </div>
    )
}
