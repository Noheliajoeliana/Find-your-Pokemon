import React,{useState, useEffect, useRef} from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPokemon, getTypes} from "../../actions"
import { Link } from "react-router-dom"
import clases from './PokeCrete.module.css'
import { firstMayus, notEmptyStr, notMinus, firstNaN, notZero } from "./Formhelp"

export default function PokeDetail(){
    
    const dispatch = useDispatch()
    
    const types = useSelector(state=>state.types)
    const loading = useSelector(state=>state.loading)

    const [inputs,setInputs] = useState({
        name: '',
        weight: '',
        height: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        types: []
    })
    const [errors,setErrors] = useState({
        name: '',
        weight: '',
        height: '',
        hp: '',
        attack:'',
        defense:'',
        speed:'',
        types: '',
    })
    const [valid,setValid] = useState(false)
    const imgRef = useRef('')
    
    function submit(e){
        e.preventDefault() 
        if(notEmptyStr(inputs) && inputs.types.length){
            dispatch(createPokemon({
                ...inputs,
                img: imgRef.current.value
            }))
            setInputs({
                name: '',
                weight: '',
                height: '',
                hp: '',
                attack: '',
                defense: '',
                speed: '',
                types: []
            })
            imgRef.current.value=''
            setValid(false)
        }
    }

    function addType(e){
        if(!inputs.types.includes(Number(e.target.value)) 
        && e.target.value !== 'Select'){
            setInputs({
                ...inputs,
                types: [...inputs.types,Number(e.target.value)]
            })
            if(notEmptyStr(inputs)
            && firstNaN(inputs.name[0]) 
            && notMinus(inputs)
            && notZero(inputs)){
                setValid(true)
                setErrors({
                    ...errors,
                    types: ''
                })
            }else if([...inputs.types,Number(e.target.value)].length){
                setValid(false)
                setErrors({
                    ...errors,
                    types:''
                })
            }
        }
    }

    function changeTextNumber(e){
        setInputs({
            ...inputs,
            [e.target.name]:e.target.value
        })
        
        if(e.target.type === 'number'){
            if(e.target.value < 0){
                setValid(false)
                setErrors({...errors, [e.target.name]: `${firstMayus(e.target.name)} can not be negative`})
            }else if(Number(e.target.value) === 0){
                setValid(false)
                setErrors({...errors, [e.target.name]: `${firstMayus(e.target.name)} can not be zero!`})
            }else if(notEmptyStr({...inputs, [e.target.name]:e.target.value}) 
            && notMinus({...inputs, [e.target.name]:e.target.value})
            && notZero({...inputs, [e.target.name]:e.target.value})
            && firstNaN(inputs.name[0]) 
            && inputs.types.length){
                setValid(true)
                setErrors({...errors, [e.target.name]:''})
            }else{
                setValid(false)
                setErrors({...errors, [e.target.name]:''})
            }
        }else if(e.target.name==='name'){
            if(!firstNaN(e.target.value) 
            && e.target.value!==''){
                setValid(false)
                setErrors({...errors, [e.target.name]:`${firstMayus(e.target.name)} can not be a pure number`})
            }else if(notEmptyStr({...inputs, name:e.target.value})
            && notMinus({...inputs, name:e.target.value})
            && notZero(inputs)
            && inputs.types.length){
                setValid(true)
                setErrors({...errors,[e.target.name]:''})
            }else{
                setValid(false)
                setErrors({...errors, [e.target.name]:''})
            }
        }
    }

    function removeType(e){
        e.preventDefault()
        let filtered = inputs.types.filter(id=>id!==Number(e.target.id))
        setInputs({
            ...inputs,
            types: filtered
        })
        if(!filtered.length){
            setValid(false)
            setErrors({
                ...errors,
                types: 'You must add at least one type'
            })
        }else if(notEmptyStr(inputs)
        && notMinus(inputs) 
        && firstNaN(inputs.name[0])){
            setValid(true)
            setErrors({
                ...errors,
                types:''
            })
        }
    }
        
    useEffect(()=>{
        if(!types.length) dispatch(getTypes())
    })
    
    let typesOptions
    if(types){
        typesOptions = types.map(t=>{
            return <option className={clases.option} key={t.id} id={t.name} value={t.id}>
                {firstMayus(t.name)}
            </option>
        })
    }

    let typesSelected
    if(inputs.types.length){
        typesSelected = inputs.types.map(tID => {

            let tName = types.find(t=>t.id===tID)
            tName = tName && tName.name
            
            return <span className={clases.type} key={tID}>{firstMayus(tName)} <button className={clases.x} id={tID} onClick={removeType}>X</button></span>
        })
    }

    let inputsNumber = ['weight','height','attack','speed','defense'].map((p,i)=>(
        <div className={clases.sec} key={i}>
            <label className={clases.label}><span className={clases.x}>*</span> {firstMayus(p)}</label>
            <div className={clases.inperror}>
                <input className={clases.input} onChange={changeTextNumber} type="number" name={p} id={p} value={inputs[p]}/>
                <span className={clases.error}>{errors[p]}</span>
            </div>
        </div>
    ))
    
    return (
        <div className={clases.body}>
            <Link to='/home' className={clases.home}>Home</Link>

            <h1 className={clases.title}>Create your own Pokémon</h1>
            <form onSubmit={submit} autoComplete='off' className={clases.form}>
                <span className={`${clases.error} ${clases.required}`}>* Required</span>
                <div className={clases.sec}>
                    <label className={clases.label}> <span className={clases.x}>*</span> Name</label>
                    <div className={clases.inperror}>
                        <input className={clases.input} onChange={changeTextNumber} type="text" name="name" id="name" value={inputs.name}/>
                        <span className={clases.error}>{errors.name}</span>
                    </div>
                </div>
                
                <div className={clases.sec}>
                    <label className={clases.label}>  Image</label>
                    <div className={clases.inperror}>
                        <input className={clases.input} onChange={changeTextNumber} type="text" name="img" id="img" ref={imgRef} placeholder='Enter a url...'/>
                    </div>
                </div>
                
                {inputsNumber}
                
                <div className={clases.sec}>
                    <label className={clases.label}><span className={clases.x}>*</span> Health Points</label>
                    <div className={clases.inperror}>
                        <input className={clases.input} onChange={changeTextNumber} type="number" name="hp" id="hp" value={inputs.hp}/>
                        <span className={clases.error}>{errors.hp}</span>
                    </div>
                </div>
                
                <div className={`${clases.sec} ${clases.sectypes}`}>
                    <label className={clases.label}><span className={clases.x}>*</span> Types</label>
                    <select className={clases.select} onClick={addType}>
                        <option>Select</option>
                        {typesOptions}
                    </select>
                    <div className={clases.inperror}>
                        <div className={clases.selected}>
                            {typesSelected}
                        </div>
                        
                        <span className={clases.error}>{errors.types}</span>
                    </div>

                </div>
                <input className={clases.boton} disabled={!valid} type="submit" value="Create" />
                {loading.loading && <span className={clases.loading}>{loading.msg}</span>}
            </form>
        </div>
    )
}