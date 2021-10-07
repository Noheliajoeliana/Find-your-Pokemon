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
        setOrdenes({...ordenes, ordenAlf: ordenes.ordenAlf ==='A-Z' ? 'Z-A' : 'A-Z'}) 
        dispatch(sortAlf(ordenes.ordenAlf))
    }
    function ordenarFuerza(){
        setOrdenes({...ordenes, ordenHP: ordenes.ordenHP==='↑' ? '↓' : '↑'})
        dispatch(sortFuerza(ordenes.ordenHP))
    }

    return(
        <div>
                <p>Sort by:</p>
                <button name='Alf' onClick={ordenarAlf}>Alphabet {ordenes.ordenAlf}</button>
                <button onClick={ordenarFuerza}>Health Points {ordenes.ordenHP}</button>

            </div>
    )
}