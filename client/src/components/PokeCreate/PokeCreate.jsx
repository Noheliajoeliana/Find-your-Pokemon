import React,{useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPokemon, getTypes} from "../../actions"
import { Link } from "react-router-dom"

export default function PokeDetail(){
    
    const dispatch = useDispatch()
    
    const types = useSelector(state=>state.types)
    const loading = useSelector(state=>state.loading)

    const [inputs,setInputs] = useState({
        name: '',
        img: '',
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

    
    function submit(e){
        e.preventDefault() 
        if(!Object.values(inputs).includes(null) || inputs.types.length){
            dispatch(createPokemon(inputs))
            setInputs({
                name: '',
                img: '',
                weight: '',
                height: '',
                hp: '',
                attack: '',
                defense: '',
                speed: '',
                types: []
            })
         
        }
    }

    function addType(e){
        if(!inputs.types.includes(Number(e.target.value)) && e.target.value !== 'Select'){
            setInputs({
                ...inputs,
                types: [...inputs.types,Number(e.target.value)]
            })
            if(!Object.values(inputs).includes('')){
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

        setValid(!Object.values({
            ...inputs, 
            [e.target.name]:e.target.value
        }).includes('') ? true : false)
        
        if(e.target.type === 'number'){
            if(e.target.value < 0){
                setValid(false)
                setErrors({...errors, [e.target.name]: `${e.target.name} can not be negative`})
            }else if(e.target.value === '0'){
                setValid(false)
                setErrors({...errors, [e.target.name]: `${e.target.name} can not be zero!`})
            }else if(!Object.values({...inputs, [e.target.name]:e.target.value}).includes('') && inputs.types.length){
                setValid(true)
                setErrors({...errors, [e.target.name]:''})
            }else{
                setValid(false)
                setErrors({...errors, [e.target.name]:''})
            }
        }else if(e.target.name==='name'){
            if(!Number.isNaN(Number(e.target.value)) && e.target.value!==''){
                setValid(false)
                setErrors({...errors, [e.target.name]:`${e.target.name} can not be a pure number`})
            }else if(!Object.values({...inputs, [e.target.name]:e.target.value}).includes('') && inputs.types.length){
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
        }else if(!Object.values(inputs).includes('')){
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
            return <option key={t.id} id={t.name} value={t.id}>
                {t.name}
            </option>
        })
    }

    let typesSelected
    if(inputs.types.length){
        typesSelected = inputs.types.map(tID => {
            let tName = types.find(t=>t.id===tID)
            tName = tName && tName.name
            return <span key={tID}>{tName} <button id={tID} onClick={removeType}>X</button></span>
        })
    }
    
    return (
        <div>
            <Link to='/home'>X</Link>
            <h1>Create your own Pokémon</h1>
            <form onSubmit={submit} autoComplete='off'>
                <label >Name</label>
                <input onChange={changeTextNumber} type="text" name="name" id="name" value={inputs.name}/>
                <span>{errors.name}</span>
                <label >Image</label>
                <input onChange={changeTextNumber} type="text" name="img" id="img" value={inputs.img}/>
                <span>{errors.img}</span>
                <label >Weight</label>
                <input onChange={changeTextNumber} type="number" name="weight" id="weight" value={inputs.weight}/>
                <span>{errors.weight}</span>
                <label >Height</label>
                <input onChange={changeTextNumber} type="number" name="height" id="height" value={inputs.height}/>
                <span>{errors.height}</span>
                <label >Health Points</label>
                <input onChange={changeTextNumber} type="number" name="hp" id="hp" value={inputs.hp}/>
                <span>{errors.hp}</span>
                <label >Attack</label>
                <input onChange={changeTextNumber} type="number" name="attack" id="attack" value={inputs.attack}/>
                <span>{errors.attack}</span>
                <label >Speed</label>
                <input onChange={changeTextNumber} type="number" name="speed" id="speed" value={inputs.speed}/>
                <span>{errors.speed}</span>
                <label >Defense</label>
                <input onChange={changeTextNumber} type="number" name="defense" id="defense" value={inputs.defense}/>
                <span>{errors.defense}</span>
                <label >Types</label>
                <select onClick={addType}>
                    <option>Select</option>
                    {typesOptions}
                </select>
                <div>
                    {typesSelected}
                </div>
                <span>{errors.types}</span>
                <input  disabled={!valid} type="submit" value="Create" />
                {loading.loading && loading.msg}
            </form>
        </div>
    )
}