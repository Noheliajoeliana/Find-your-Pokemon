import React from "react"
import Pokemons from "../Pokemons/Pokemons"
import SearchBar from "./HomeForms/SearchBar/SearchBar"
import Orden from "./HomeForms/Orden/Orden"
import Filtrado from "./HomeForms/Filtrado/Filtrado"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { clearAll} from "../../actions"

export default function Home(){

    const dispatch = useDispatch()
    
    const [page,setPage] = useState(1)

    function clickPage(e){
        setPage(Number(e.target.id))
    }
    function changePage(){
        setPage(1)
    }

    return (
        <div>
            <h1>Pokemones</h1>
            <Link to='/create'><button>Crear pokemon</button></Link>
            <SearchBar/>
            <Orden/>
            <Filtrado changePage={changePage}/>

            <Pokemons page={page} clickPage={clickPage}/>
        </div>
    )
}
