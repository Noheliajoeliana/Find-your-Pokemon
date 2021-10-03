import React from "react"
import { Link } from "react-router-dom"

export default function Pokemon(params){
    let types = params.content.types.map(t=> <p>{t.name}</p>)
    return (
        <div style={{border:'1px solid black'}}>
            <h1>Poke  
                <Link to={`/details/${params.content.id}`}> {params.content.name}</Link>
            </h1>
                <p>tipos:{types}</p>
        </div>
    )
}
