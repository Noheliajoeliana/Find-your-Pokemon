const express = require('express')
const router = express.Router()
const helpers = require('./helpers.js')


//esto es: /pokemons...

router.use(express.json())

//ruta para pedir todos los pokemones y para buscar por name por query, listo!!
router.get('/', helpers.findPokeByName)

//ruta para pedir un pokemon específico por ID (params), listo!
router.get('/:id', helpers.findPokeByID)


//ruta para postear pokemon en db, listo!
router.post('/', helpers.postPoke)



module.exports = router