import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { getPokeName } from "../../../../actions";

export default function SearchBar(){
    

    const dispatch = useDispatch()
    
    const [input,setInput] = useState({
        name: '',
        disabled: true
    })

    function search(e){
        e.preventDefault()
        if(input.name) dispatch(getPokeName(input.name))
    }

    function changeName(e){
        if(e.target.value.trim()) setInput({disabled: false, name: e.target.value})
        else setInput({disabled:true,name:e.target.value})
    }

    return(
        <form onSubmit={search}>
            <label>Busca tu pokemon</label>
            <input onChange={changeName} type="text" name="nombre" id="" />
            <input type="submit" disabled={input.disabled} value="Buscar" />
        </form>
    )
}
