import React from "react"
import Pokemons from "../Pokemons/Pokemons"
import SearchBar from "./HomeForms/SearchBar/SearchBar"
import Orden from "./HomeForms/Orden/Orden"
import Filtrado from "./HomeForms/Filtrado/Filtrado"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function Home(){
    
    const [page,setPage] = useState(1)

    function clickPage(e){
        setPage(Number(e.target.id))
    }
    function changePage(){
        setPage(1)
    }

    return (
        <div>
            <Link to='/'>
                <button>Leave</button>
            </Link>
            <h1>Pokemones</h1>
            <Link to='/create'><button>Create your own pokémon</button></Link>
            <SearchBar/>
            <Orden/>
            <Filtrado changePage={changePage}/>

            <Pokemons page={page} clickPage={clickPage}/>
        </div>
    )
}
