const express = require('express')
const router = express.Router()
const {Type } = require('../db.js')
const helpers = require('./helpers.js')


//esto es: /types...

router.use(express.json())

//Ruta para obtener todos los types desde la base de datos, listo!
router.get('/', helpers.getTypes)


module.exports = router