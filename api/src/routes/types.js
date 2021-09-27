const express = require('express')
const router = express.Router()
const {Type } = require('../db.js')
const helpers = require('./helpers.js')


//esto es: /types...

router.use(express.json())

//Ruta para obtener todos los types desde la base de datos, listo!
router.get('/', async (req,res)=>{
    try{
        let types = await Type.findAll({
            attributes: ['name','id']
        })
       
        return res.send(types)
    }catch(err){
        return res.status(500).send(`Server error: ${err}`)
    }
})


module.exports = router