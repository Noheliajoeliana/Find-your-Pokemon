const { default: axios } = require('axios')
const express = require('express')
const router = express.Router()
const { Pokemon, Type } = require('../db.js')
const helpers = require('./helpers.js')


//esto es: /pokemons...

router.use(express.json())

//ruta para pedir todos los pokemones, aun falta 
router.get('/', (req,res)=>{
    helpers.bringPokes()
    res.send('por ahora solo trae name y url')
})

router.get('/:id', async (req,res)=>{
    const {id} = req.params
    try{
        let pokemon = await helpers.findPoke(id)
        res.send(pokemon)
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