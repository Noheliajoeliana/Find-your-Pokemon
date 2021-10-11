import React from "react"
import { Link } from "react-router-dom"
import clases from './Landing.module.css'
import pokemon from '../../Imagenes/Logo.png'
import family from '../../Imagenes/FamilyPokes.png'


export default function Landing(){
    

    return(
        <div className={clases.container}>
            <div className={clases.header}>
                <div >
                    <h1 className={clases.h1} >Find your</h1>
                    <img src={pokemon} alt="" />
                </div>
                <div className={clases.go}>
                    <Link to='/home' >
                        <button className={clases.botonGo}>Go</button>
                    </Link>
                </div>
            </div>
            <img className={clases.imgPrincipal} src={family} alt="PokeFamily" />
        </div>
    )
}
