import React, {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTypes, filterTypes,filterDB, clearAll} from "../../../../actions"

export default function Filtrado({changePage}){
    
    const dispatch = useDispatch()

    const [input,setInput] = useState({
        types: [],
        DBAPI: ''
    })

    const types = useSelector(state=>state.types)

    useEffect(()=>{
        dispatch(getTypes())
    })

    function changeType(e){
        if(input.types.includes(Number(e.target.id))){
            setInput({...input,types: input.types.filter(t=>t!==Number(e.target.id))})
        }else{
            setInput({...input,types:[...input.types,Number(e.target.id)]})
        }
    }
    function changeDB(e){
        setInput({...input, DBAPI:e.target.value})
    }
    function filter(e){
        e.preventDefault()
        if(input.types.length>0) dispatch(filterTypes(input.types));
        if(input.DBAPI) dispatch(filterDB(input.DBAPI));
        changePage()
    }
    function clear(){
        dispatch(clearAll())
    }

    let typesForm = types.map(t=>{
        return (
            <span onClick={changeType} key={t.id} id={t.id}>{t.name}   </span>
        )
    })

    return(
        <div>
            <p>Filtrar tipos:</p>
            <form>
                {typesForm}
            </form>
            <form onSubmit={filter}>
                <input onClick={changeDB} type="radio" id='DB'  name="DBAPI" value='DB'/>
                <label for='DB' name='db'>DB</label>
                <input onClick={changeDB} type="radio" id='API' name="DBAPI" value='API'/>
                <label for='API' name='api'>API</label>
                <input onClick={changeDB} type="radio" id='Todos' name="DBAPI" value='todos'/>
                <label for='Todos' name='Todos'>Todos</label>
                <input type="submit" value="Filtrar" />
            </form>
            
            <button onClick={clear}>Limpiar todos los filtros</button>
        </div>
    )
}