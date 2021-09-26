const express = require('express')
const router = express.Router()
const { Pokemon, Type } = require('../db.js')


//esto es: /pokemons...

router.use(express.json())

router.get('/', (req,res)=>{
    
})


module.exports = router