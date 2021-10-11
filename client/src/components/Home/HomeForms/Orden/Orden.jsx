import React, {useState} from "react"
import { useDispatch } from "react-redux"
import { sortAlf, sortFuerza } from "../../../../actions"
import clases from './Orden.module.css'

export default function Orden({checked}){
    
    const dispatch = useDispatch()

    const [ordenes, setOrdenes] = useState({
        ordenAlf: 'A-Z',
        ordenHP: '↑'
    })

    function ordenarAlf(e){
        setOrdenes({...ordenes, ordenAlf: ordenes.ordenAlf ==='A-Z' ? 'Z-A' : 'A-Z'}) 
        dispatch(sortAlf(ordenes.ordenAlf))
    }
    function ordenarFuerza(){
        setOrdenes({...ordenes, ordenHP: ordenes.ordenHP==='↑' ? '↓' : '↑'})
        dispatch(sortFuerza(ordenes.ordenHP))
    }

    return(
        <div className={clases.order}>
            <p className={clases.sort}>Sort by:</p>
            <button className={clases.boton} onClick={ordenarAlf}>Alphabet {ordenes.ordenAlf}</button>
            <button className={clases.boton} onClick={ordenarFuerza}>Health Points {ordenes.ordenHP}</button>
        </div>
    )
}