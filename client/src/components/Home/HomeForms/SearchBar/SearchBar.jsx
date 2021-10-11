import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { getPokeName } from "../../../../actions";
import clases from './SearchBar.module.css'

export default function SearchBar({changePage}){

    const dispatch = useDispatch()

    const [input,setInput] = useState({
        name: '',
        disabled: true
    })

    function search(e){
        e.preventDefault()
        if(input.name){
            dispatch(getPokeName(input.name))
            setInput({
                name: '',
                disabled: true
            })
            changePage()
        } 
    }

    function changeName(e){
        if(e.target.value.trim()) setInput({disabled: false, name: e.target.value})
        else setInput({disabled:true,name:e.target.value})
    }

    return(
        <form onSubmit={search} autoComplete='off' className={clases.form}>
            <label className={clases.label}>Search your Pokémon</label>
            <div className={clases.busca}>
                <input className={clases.input} onChange={changeName} type="text" name="nombre" value={input.name}/>
                <input className={clases.boton} type="submit" disabled={input.disabled} value="Search" />
            </div>
        </form>
    )
}
