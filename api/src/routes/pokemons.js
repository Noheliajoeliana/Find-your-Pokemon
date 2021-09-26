const { default: axios } = require('axios')
const express = require('express')
const router = express.Router()
const { Pokemon, Type } = require('../db.js')
const helpers = require('./helpers.js')


//esto es: /pokemons...

router.use(express.json())

router.get('/', async (req,res)=>{
    let pokes = await helpers.bringPokes()
    res.send('Por ahora solo trae nombre y url')
})

module.exports = router