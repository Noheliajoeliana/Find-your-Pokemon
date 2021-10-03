import React from "react"
import { useState, useEffect } from "react"
import {  useSelector , useDispatch} from "react-redux"
import { clearAll, getAllPokemons, sortAlf, sortFuerza, getTypes, filterTypes} from "../../actions"
import Pokemon from '../Pokemon/Pokemon.jsx'



export default function Pokemons(params){
    
    const dispatch = useDispatch()
    const [ordenAlf,setOrdenAlf] = useState('A-Z')
    const [ordenFuerza,setOrdenFuerza] = useState('^')
    const [inputTypes,setInputTypes] = useState([])

    const pokemons = useSelector(state => state.pokemons)
    const loading = useSelector(state => state.loading)
    const types = useSelector(state=>state.types)
    

    function ordenarAlf(){
        setOrdenAlf(ordenAlf==='A-Z' ? 'Z-A' : 'A-Z') //revisar para usar con useRef
        dispatch(sortAlf(ordenAlf))
    }
    function ordenarFuerza(){
        setOrdenFuerza(ordenFuerza==='^' ? 'v' : '^')
        dispatch(sortFuerza(ordenFuerza))
    }
    function clear(){
        dispatch(clearAll())
        setOrdenAlf('A-Z')
        setOrdenFuerza('^')
    }
    function change(e){
        if(inputTypes.includes(Number(e.target.name))){
            setInputTypes(inputTypes.filter(t=>t!==Number(e.target.name)))
        }else{
            setInputTypes([...inputTypes,Number(e.target.name)])
        }
    }
    function filtTypes(e){
        e.preventDefault()
        // console.log(inputTypes)
        dispatch(filterTypes(inputTypes))
    }

    
    useEffect(() => {
        if(!pokemons.length && !loading.loading){
            dispatch(getAllPokemons())
        }
    })
    
    useEffect(()=>{
        dispatch(getTypes())
    },[])
    
    let pokes = pokemons.map(poke => {
        return <Pokemon content={poke} />    
    })

    let typesForm = types.map(t=>{
        return <div>
            <input onChange={change} type="checkbox" name={t.id} id="" /> 
            <label name={t.id}>{t.name}</label>
        </div>
    })

    return(
        <div>
            <h1>Contenedor de muchos pokemones </h1>
            <div>
                <p>Ordenar por:</p>
                <button onClick={ordenarAlf}>{ordenAlf}</button>
                <button onClick={ordenarFuerza}>Fuerza {ordenFuerza}</button>

            </div>
            <div>
                <p>Filtrar tipos:</p>
                <form onSubmit={filtTypes}>
                    {typesForm}
                    <input type="submit" value="Filtrar" />
                </form>

            </div>
            <button onClick={clear}>Limpiar todos los filtros</button>
            {loading.loading && loading.msg}
            {pokes}
        </div>
    )
}
