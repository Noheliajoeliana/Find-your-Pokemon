import React from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getAllPokemons } from "../../actions"


export default function Landing(params){
    

    return(
        <div>
            <h1>Landing Page</h1>
            <Link to='/home'><button >Entrar</button></Link>
        </div>
    )
}
