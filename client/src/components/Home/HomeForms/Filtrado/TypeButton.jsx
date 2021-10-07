import { useState, useEffect } from "react"


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
    })

    return (
        <button onClick={click} id={id}>{name} </button>
    )
}