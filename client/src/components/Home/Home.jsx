import React from "react"
import Pokemons from "../Pokemons/Pokemons"
import SearchBar from "./HomeForms/SearchBar/SearchBar"
import Orden from "./HomeForms/Orden/Orden"
import Filtrado from "./HomeForms/Filtrado/Filtrado"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import clases from './Home.module.css'
import Logo from '../../Imagenes/Logo.png'

export default function Home(){
    
    const [page,setPage] = useState(1)

    function clickPage(e){
        setPage(Number(e.target.id))
    }
    function changePage(){
        setPage(1)
    }

    return (
        <div className={clases.container}>
            <div className={clases.nav}>
                
                <div className={clases.logo}>
                    <h1 className={clases.title}>Find your</h1>
                    <img className={clases.loguito} src={Logo} alt="Poke Logo" />
                </div>

                <NavLink to='/' >
                    <button className={clases.leave}>Leave</button>
                </NavLink>
                
            </div>

            <div className={clases.main}>
                <div className={clases.filters}>
                    <SearchBar changePage={changePage}/>
                    <Orden/>
                    <Filtrado changePage={changePage}/>
                    <NavLink to='/create' >
                        <button className={clases.crear}>Create your own pokémon</button>
                    </NavLink>
                </div>
                <Pokemons page={page} clickPage={clickPage}/>
            </div>
        </div>
    )
}
