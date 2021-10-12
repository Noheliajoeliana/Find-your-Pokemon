import { useState, useEffect } from "react"
import clases from './TypeButton.module.css'


export default function TypeButton({changeType,id,name,cleared}){
    const [checked,setChecked] = useState(false)

    function click(e){
        changeType(e)
        setChecked(checked ? false : true)
    }

    useEffect(() => {
        if(cleared && checked){
            setChecked(false)
        }
    },[checked,cleared])

    let nombre = name[0].toUpperCase()+name.slice(1)
    
    return (
        <button className={`${clases.TypeButton} ${checked && clases.checked}`} onClick={click} id={id}>{nombre} </button>
    )
}