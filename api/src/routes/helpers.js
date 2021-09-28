const axios = require('axios') 
const {Pokemon, Type} = require('../db.js')

function filterTypesFromURL(arr){
    return arr.map(t=>{
        let arr = t.type.url.split('/')
        return Number(arr[arr.length-2])
    })
}

function mapTypes(arr){
    return arr.map(type => Number(type.id))
}

module.exports = { 
    prueba: async(req,res) => {
        const pApi = await axios.get("https://pokeapi.co/api/v2/pokemon")
        let datosPApi = pApi.data.results
        let pData = []
        for (p of datosPApi) {
            let subReq = p.url
            let subReqPoke = await axios.get(`${subReq}`)
            pData.push({
                id:subReqPoke.data.id,
                name: subReqPoke.data.name,
                type: subReqPoke.data.types.map(e => e.type.name),
                image: subReqPoke.data.sprites.other.dream_world.front_default,
                attack: subReqPoke.data.stats[1].base_stat,
            })
        }
        res.status(200).send(pData)
    },
    bringAllPokes: async function(){

        try{
    
            const datos1 = (await axios.get('https://pokeapi.co/api/v2/pokemon')).data
           
            const pokesArr = datos1.results
    
            // const promArr = pokesArr.map(poke => axios.get(poke.url))
            let promArr = []
            for(let i=0; i<pokesArr.length; i++){
                promArr.push(axios.get(pokesArr[i].url))
            }

            let resultAPI = (await Promise.all(promArr)).map(poke => {
                return ({
                    id: poke.data.id,
                    name: poke.data.name,
                    types: filterTypesFromURL(poke.data.types),
                    img: poke.data.sprites.other.dream_world.front_default
                })
            })


            let db = await Pokemon.findAll({
                attributes: ['name', 'id', 'img'],
                include: {
                    model: Type
                }
            })

            let resultDB = db.map(poke=>{
                return ({
                    id: poke.id,
                    name: poke.name,
                    img:poke.img,
                    types: mapTypes(poke.types)
                })
            })
            return [...resultDB,...resultAPI]
    
        }catch(err){
            return err
        }
        
    },

    postPoke: async function(req, res){
        //pokemon trae: _nombre_, vida, ataque, defensa, velocidad, _altura_, _peso_, _imagen_ tipos(array)
        try{
            const {name, weight, height, img, hp, speed, attack, defense, types} = req.body
            //creo un nuevo pokemon con los datos traídos
            const poke = await Pokemon.create({
                name: name.toLowerCase(),
                height,
                weight,
                img,
                hp,
                speed,
                attack,
                defense
            })
            await poke.addTypes(types) //para añadir los tipos a la tabla intermedia 
            return res.send('se posteó')
        }catch(err){
            res.status(500).send('Error de server: ', err)
        }
       
    },

    findPokeByID: async function(req, res){
        const {id} = req.params
        try{
            let pokemon 
            if(id.length > 10){ //si el id coincide con db
                
                pokemon = (await Pokemon.findByPk(id, {
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: {
                        model: Type
                    }
                })).toJSON()
                pokemon = {...pokemon, types: mapTypes(pokemon.types)}
                console.log(pokemon)
                
            }else{ //si el id coincide con API
                
                let obj = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data
            
                pokemon = {
                    name: obj.name,
                    height: obj.height,
                    id: id,
                    weight: obj.weight,
                    hp: obj.stats[0].base_stat,
                    attack: obj.stats[1].base_stat,
                    defense: obj.stats[2].base_stat,
                    speed: obj.stats[5].base_stat,
                    img: obj.sprites.other.dream_world.front_default,
                    gif: obj.sprites.versions['generation-v']['black-white'].animated.front_default,
                    types: filterTypesFromURL(obj.types)
                }
            }
            return res.send(pokemon) 
        }catch(err){
            return err.name.includes('Error') 
                ? res.status(404).send('No se pudo encontrar al pokemon')
                : res.status(500).send(`Server error: ${err}`)
        }
    },
    findPokeByName: async function(req, res){
        const {name} = req.query

        try{
                let dataDB = await Pokemon.findAll({
                    where: {
                        name: name
                    },
                    include: {
                        model: Type
                    }
                }) 
                let pokemons = dataDB.map(poke=>{
                    return ({
                        id: poke.id,
                        name:poke.name,
                        img:poke.img,
                        types: mapTypes(poke.types)
                    })
                })
                
                let dataAPI = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)).data
                console.log(dataAPI)
                let pokemon = {
                    id: dataAPI.id,
                    name: dataAPI.name,
                    types: filterTypesFromURL(dataAPI.types),
                    img: dataAPI.sprites.other.dream_world.front_default
                }
                
                
                return res.send([...pokemons,pokemon])
            
        }catch(err){
            return err.message.includes('404') 
                ? res.status(404).send('No se pudo encontrar al pokemon')
                : res.status(500).send(`Server error: ${err}`)
        }
    }
}