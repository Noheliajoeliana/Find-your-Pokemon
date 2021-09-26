const { default: axios } = require('axios')
const express = require('express')
const router = express.Router()
const { Pokemon, Type } = require('../db.js')
const helpers = require('./helpers.js')


//esto es: /pokemons...

router.use(express.json())

//ruta para pedir todos los pokemones, aun falta 
router.get('/', async (req,res)=>{
    const {name} = req.query
    try{
        if(!name){
            let pokemons = await helpers.bringAllPokes()
            // console.log(pokemons)
            return res.send(pokemons)
        }else{
            let pokemon = await helpers.findPokeByName(name)
            
            return pokemon.message 
                ? res.status(404).send('No pudimos encontrar el pokemon solicitado')
                : res.send(pokemon)
        }
    }catch(err){
        return res.status(500).send(`Server error: ${err}`)
    }
})

//ruta para pedir un pokemon específico por ID, listo!
router.get('/:id', async (req,res)=>{
    const {id} = req.params
    try{
        let pokemon = await helpers.findPokeByID(id)

        return pokemon.message 
            ? res.status(404).send('No pudimos encontrar el pokemon solicitado') 
            : res.send(pokemon)

    }catch(err){
        res.status(500).send(`Server error: ${err}`)
    }
})


//ruta para postear pokemon en db, listo!
router.post('/', (req,res)=>{
    const pokemon = req.body
    try{
        helpers.postPoke(pokemon)
        res.send('se posteó')
    }catch(err){
        res.status(500).send('Error de server: ', err)
    }
})



module.exports = router