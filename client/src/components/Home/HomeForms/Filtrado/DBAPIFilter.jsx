import { useState, useEffect } from "react"
import clases from './DBAPIFilter.module.css'


export default function DBAPIFilter({changeDB,cleared}){

    const [disabled,setDisabled] = useState({
        DB: false,
        API: false
    })
    function click(e){
        changeDB(e)
        if(e.target.value === 'DB' && !disabled.DB) setDisabled({API:true,DB:false})
        if(e.target.value === 'DB' && disabled.API) setDisabled({API:false,DB:false})
        if(e.target.value === 'API' && !disabled.API ) setDisabled({API:false,DB:true})
        if(e.target.value === 'API' && disabled.DB ) setDisabled({API:false,DB:false})
    }

    useEffect(() => {
        if(cleared && (disabled.DB || disabled.API)){
            setDisabled({
                DB:false,
                API:false
            })
        }
    })
    
    return(
        <div>
            <input className={`${clases.boton} ${disabled.API && clases.active} ${disabled.DB && clases.disabled}`} 
                   disabled={disabled.DB} onClick={click} type="button" name="DBAPI" value='DB'/>

            <input className={`${clases.boton} ${disabled.DB && clases.active} ${disabled.API && clases.disabled}`} 
                   disabled={disabled.API} onClick={click} type="button" name="DBAPI" value='API'/>
        </div>
    )
}