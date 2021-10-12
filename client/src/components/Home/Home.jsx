import React from "react"
import Pokemons from "../Pokemons/Pokemons"
import SearchBar from "./HomeForms/SearchBar/SearchBar"
import Orden from "./HomeForms/Orden/Orden"
import Filtrado from "./HomeForms/Filtrado/Filtrado"
import { Link } from "react-router-dom"
import { useState } from "react"
import clases from './Home.module.css'
import Logo from '../../Imagenes/Logo.png'
import linkedin from '../../Imagenes/linkedin.png'
import github from '../../Imagenes/github.png'

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

                <Link to='/' >
                    <button className={clases.leave}>Leave</button>
                </Link>
                
            </div>

            <div className={clases.main}>
                <div className={clases.filters}>
                    <SearchBar changePage={changePage}/>
                    <Orden/>
                    <Filtrado changePage={changePage}/>
                    <Link to='/create' >
                        <button className={clases.crear}>Create your own pokémon</button>
                    </Link>
                    <div>
                        <Link to='//linkedin.com/in/noheliarincon' target='blank'>
                            <img className={clases.link} src={linkedin} alt="" />
                        </Link>
                        <Link to='//github.com/Noheliajoeliana' target='blank'>
                            <img className={clases.link} src={github} alt="" />
                        </Link>
                    </div>
                </div>
                <Pokemons page={page} clickPage={clickPage}/>
            </div>
        </div>
    )
}
