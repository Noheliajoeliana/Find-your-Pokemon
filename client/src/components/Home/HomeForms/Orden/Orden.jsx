import React, {useState} from "react"
import { useDispatch } from "react-redux"
import { sortAlf, sortFuerza } from "../../../../actions"

export default function Orden({checked}){
    
    const dispatch = useDispatch()

    const [ordenes, setOrdenes] = useState({
        ordenAlf: 'A-Z',
        ordenHP: '↑'
    })

    function ordenarAlf(e){
        console.log(e.target.name)
        setOrdenes({...ordenes, ordenAlf: ordenes.ordenAlf ==='A-Z' ? 'Z-A' : 'A-Z'}) 
        dispatch(sortAlf(ordenes.ordenAlf))
    }
    function ordenarFuerza(){
        setOrdenes({...ordenes, ordenHP: ordenes.ordenHP==='↑' ? '↓' : '↑'})
        dispatch(sortFuerza(ordenes.ordenHP))
    }

    return(
        <div>
                <p>Ordenar por:</p>
                <button name='Alf' onClick={ordenarAlf}>{ordenes.ordenAlf}</button>
                <button onClick={ordenarFuerza}>HP {ordenes.ordenHP}</button>

            </div>
    )
}