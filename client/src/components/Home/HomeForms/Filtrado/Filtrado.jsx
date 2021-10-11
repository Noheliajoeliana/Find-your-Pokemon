import React, {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTypes, filterTypes,filterDB, clearAll} from "../../../../actions"
import TypeButton from "./TypeButton"
import DBAPIFilter from "./DBAPIFilter"
import clases from './Filtrado.module.css'

export default function Filtrado({changePage}){
    
    const dispatch = useDispatch()

    const [input,setInput] = useState({
        types: [],
        DBAPI: ''
    })
    const[cleared,setCleared] = useState(true)
    const types = useSelector(state=>state.types)

    useEffect(()=>{
        if(!types.length) dispatch(getTypes())
    })

    function changeType(e){
        e.preventDefault()
        if(input.types.includes(Number(e.target.id))){
            setInput({...input,types: input.types.filter(t=>t!==Number(e.target.id))})
        }else{
            setInput({...input,types:[...input.types,Number(e.target.id)]})
        }
        setCleared(false)
    }
    function changeDB(e){
        if(!input.DBAPI){
            setInput({...input, DBAPI:e.target.value})
        }else if(input.DBAPI === e.target.value){
            setInput({...input, DBAPI:''})
        }
        setCleared(false)
    }
    function filter(e){
        e.preventDefault()
        if(input.types.length>0) dispatch(filterTypes(input.types));
        if(input.DBAPI) dispatch(filterDB(input.DBAPI));
        changePage()
    }
    function clear(){
        dispatch(clearAll())
        setInput({DBAPI:'',types:[]})
        setCleared(true)
    }

    let typesForm = types.map(t=>{
        return (
            <TypeButton changeType={changeType} key={t.id} id={t.id} name={t.name} cleared={cleared}/>
        )
    })
    

    return(
        <div>
            <p className={clases.filterby}>Filter by:</p>
            <form className={clases.form} onSubmit={filter}>
                <div className={clases.types}>
                    {typesForm}
                </div>
                <DBAPIFilter changeDB={changeDB} clear={clear} cleared={cleared}/>
                
                <div className={clases.botones}>
                    <input className={clases.boton} disabled={input.types.length || input.DBAPI ? false : true} type="submit" value="Filtrar" />
                    <button className={clases.boton} onClick={clear}>Clear all filters</button>
                </div>
            </form>
            
        </div>
    )
}