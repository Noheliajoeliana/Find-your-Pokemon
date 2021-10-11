import React from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getPokeDetail, clearDetail} from "../../actions"
import { useEffect } from "react"
import clases from './PokeDetail.module.css'
import notFound from '../../Imagenes/notFound.png'

export default function PokeDetail({id}){

    const dispatch = useDispatch()
    const pokemon = useSelector(state=>state.pokeDetail)
    const loading = useSelector(state=>state.loading)

    useEffect(() => {
        if(pokemon.id!==id && !loading.loading && typeof pokemon!=='string'){
            dispatch(getPokeDetail(id))
        }
    })

    function clearDet(){
        dispatch(clearDetail())
    }

    let pokeID 
    if(pokemon.id){
        pokeID=pokemon.id.length > 10 ? 'Created' : `#${pokemon.id}`
    }
    
    let types
    if(pokemon.types){
        types = pokemon.types.map(t=>{
            return <span className={clases.type} key={t.id}>{t.name[0].toUpperCase()+t.name.slice(1)} </span>
        })
    }
    return (
        <div className={clases.body}>
            <Link to='/home' onClick={clearDet} className={clases.home}>Home</Link>
            
            {loading.loading ? 
                <div className={clases.loading}>
                    <span className={clases.msg}>{loading.msg}</span>
                    <img className={clases.loadingimg} src='https://raw.githubusercontent.com/itsjavi/pokemon-assets/master/assets/svg/pokeball.svg' alt="" />
                </div>
            :
            <div>
                {pokemon.name ?
                <div className={clases.container}>
                    <div className={clases.top}>
                        <p className={clases.id}>{pokeID}</p>
                        <h1 className={clases.name}>{pokemon.name[0].toUpperCase()+pokemon.name.slice(1)}</h1>
                        <img className={clases.gif} src={pokemon.gif} alt="" /> 
                    </div>

                    <div className={clases.infocont}>
                        <img className={clases.img} src={pokemon.img} alt="Pokémon" />
                        <div className={clases.info}>
                            <p className={clases.att}>Height: 
                                <span>{pokemon.height}</span>
                            </p>
                            <p className={clases.att}>Weight: 
                                <span>{pokemon.weight}</span>
                            </p>
                            <p className={clases.att}>Health points: 
                                <span>{pokemon.hp}</span>
                            </p>
                            <p className={clases.att}>Attack: 
                                <span>{pokemon.attack}</span>
                            </p>
                            <p className={clases.att}>Defense: 
                                <span>{pokemon.defense}</span>
                            </p>
                            <p className={clases.att}>Speed: 
                                <span>{pokemon.speed}</span>
                            </p>
                            <h2 className={clases.typestitle}>Types:</h2>
                            <div className={clases.typecont}>
                                {types}
                            </div>
                        </div>
                    </div>
                </div> : typeof pokemon === 'string' &&
                <div className={clases.error}>
                    <h1 className={clases.msg}>404</h1>
                    <span className={clases.msg}>{pokemon}</span>
                    <img className={clases.imgNotfound} src={notFound} alt="404" />
                </div>}
            </div>}
        </div>
    )
}