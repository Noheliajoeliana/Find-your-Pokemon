import React from "react"
import Pokemons from "../Pokemons/Pokemons"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { sortAlf, sortFuerza, clearAll, filterTypes, getTypes, getPokeName, filterDB } from "../../actions"

export default function Home(params){

    const dispatch = useDispatch()

    const [ordenAlf,setOrdenAlf] = useState('A-Z')
    const [ordenFuerza,setOrdenFuerza] = useState('^')
    const [inputName,setInputName] = useState('')
    const [inputTypes,setInputTypes] = useState([])
    const [inputDBAPI,setInputDBAPI] = useState('')
    const [page,setPage] = useState(1)

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
    function changeName(e){
        setInputName(e.target.value)
    }
    function changeDB(e){
        console.log(e.target.value)
        setInputDBAPI(e.target.value)
    }
    function filtTypes(e){
        e.preventDefault()
        if(inputTypes.length>0) dispatch(filterTypes(inputTypes));
        if(inputDBAPI) dispatch(filterDB(inputDBAPI));
        setPage(1)
    }
    function search(e){
        e.preventDefault()
        dispatch(getPokeName(inputName))
    }
    function clickPage(e){
        setPage(Number(e.target.id))
    }

    useEffect(()=>{
        dispatch(getTypes())
    },[])

    let typesForm = types.map(t=>{
        return <div>
            <input onChange={change} type="checkbox" name={t.id} id="" /> 
            <label name={t.id}>{t.name}</label>
        </div>
    })

    return (
        <div>
            <h1>Pokemones</h1>
            <Link to='/create'><button>Crear pokemon</button></Link>

            <form onSubmit={search}>
                <label>Busca tu pokemon</label>
                <input onChange={changeName} type="text" name="nombre" id="" />
            </form>

            <div>
                <p>Ordenar por:</p>
                <button onClick={ordenarAlf}>{ordenAlf}</button>
                <button onClick={ordenarFuerza}>Fuerza {ordenFuerza}</button>

            </div>
            <div>
                <p>Filtrar tipos:</p>
                <form onSubmit={filtTypes}>
                    {typesForm}
                    <input onClick={changeDB} type="radio"  name="DBAPI" value='DB'/>
                    <label name='db'>DB</label>
                    <input onClick={changeDB} type="radio"  name="DBAPI" value='API'/>
                    <label name='api'>API</label>
                    <input type="submit" value="Filtrar" />
                </form>

            </div>
            <button onClick={clear}>Limpiar todos los filtros</button>

            <Pokemons page={page} clickPage={clickPage}/>
        </div>
    )
}
