import React,{useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import {  createPokemon } from "../../actions"
import { useEffect } from "react"

export default function PokeDetail(params){
    
    const types = useSelector(state=>state.types)
    const loading = useSelector(state=>state.loading)
    const [inputs,setInputs] = useState({
        name: '',
        img: '',
        weight: '',
        height: '',
        hp: '',
        attack:'',
        defense:'',
        speed:'',
        types: []
    })
    const dispatch = useDispatch()

    let typesForm
    if(types){
        typesForm = types.map(t=>{
            return <div>
                <input onChange={change} type="checkbox" name={t.id} id="" /> 
                <label name={t.id}>{t.name}</label>
            </div>
        })
    }

    function submit(e){
        e.preventDefault()
        dispatch(createPokemon(inputs))
    }
    function change(e){
        if(e.target.type==='checkbox'){
            if(inputs.types.includes(Number(e.target.name))){
                setInputs({
                    ...inputs,
                    types: inputs.types.filter(t=>t!==Number(e.target.name))
                })
            }else{
                setInputs({
                    ...inputs,
                    types: [...inputs.types,Number(e.target.name)]
                })
            }
        }else{
            setInputs({
                ...inputs,
                [e.target.name]:e.target.value
            })
        }
    }
    return (
        <div>
            <h1>Crear</h1>
            <form onSubmit={submit} action="">
                <label >Nombre</label>
                <input onChange={change} type="text" name="name" id="" />
                <label >Imagen</label>
                <input onChange={change} type="text" name="img" id="" />
                <label >Peso</label>
                <input onChange={change} type="number" name="weight" id="" />
                <label >Altura</label>
                <input onChange={change} type="number" name="height" id="" />
                <label >HP</label>
                <input onChange={change} type="number" name="hp" id="" />
                <label >Ataque</label>
                <input onChange={change} type="number" name="attack" id="" />
                <label >Velocidad</label>
                <input onChange={change} type="number" name="speed" id="" />
                <label >Defensa</label>
                <input onChange={change} type="number" name="defense" id="" />
                <label >Tipos</label>
                {typesForm}
                <input type="submit" value="Crear" />
                {loading.loading && loading.msg}
            </form>
        </div>
    )
}