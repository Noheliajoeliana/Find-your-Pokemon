const axios = require('axios') 
const {Pokemon, Type} = require('../db.js')

function filterTypesFromURL(arr){
    return arr.map(t=>{
        let arr = t.type.url.split('/')
        return {
            name: t.type.name,
            id: Number(arr[arr.length-2])
        }
    })
}

function mapTypes(arr){
    return arr.map(type => {
        return {
            name: type.name,
            id: Number(type.id)
        }
    })
}

module.exports = { 

    findPokeByName: async function(req, res){
        let {name} = req.query
        
        if(!name){
            
            try{
                // const pokesArr = (await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=40')).data.results
                const pokesArr = (await axios.get('https://pokeapi.co/api/v2/pokemon?limit=30')).data.results
              
                // let resultAPI = []
                // for(let poke of pokesArr){
                //     let subreq = await axios.get(poke.url).then(res=>{
                //         return res})
                //     resultAPI.push({
                //         id: subreq.data.id,
                //         name: subreq.data.name,
                //         types: filterTypesFromURL(subreq.data.types),
                //         img: subreq.data.sprites.other.dream_world.front_default,
                //         hp: subreq.data.stats[0].base_stat
                //     })
                // }

                //Esto me parece más eficiente, pero no me funciona
                let promArr = []
                for(let p of pokesArr){
                    promArr.push(axios.get(p.url))
                }
                let resultAPI = (await Promise.all(promArr))
                .map(poke => {
                    return ({
                        id: poke.data.id,
                        name: poke.data.name,
                        types: filterTypesFromURL(poke.data.types),
                        img: poke.data.sprites.other.dream_world.front_default || 'https://raw.githubusercontent.com/itsjavi/pokemon-assets/master/assets/svg/pokeball.svg',
                        hp: poke.data.stats[0].base_stat
                    })
                })
                   
                let db = await Pokemon.findAll({
                    attributes: ['name', 'id', 'img', 'hp'],
                    include: {
                        model: Type
                    }
                })
    
                let resultDB = db.map(poke=>{
                    return ({
                        id: poke.id,
                        name: poke.name,
                        img:poke.img,
                        hp: poke.hp,
                        types: mapTypes(poke.types)
                    })
                })
                return res.send([...resultDB,...resultAPI]) 
        
            }catch(err){
                return res.status(500).send(`Server error: ${err}`)
            }
        }

        try{
            name = name.toLowerCase().trim()
            let dataDB = await Pokemon.findAll({
                where: {
                    name: name
                    },
                include: {
                    model: Type
                }
            })

            let pokemonsDB = dataDB.map(poke=>{
                return ({
                    id: poke.id,
                    name:poke.name,
                    img:poke.img,
                    types: mapTypes(poke.types)
                })
            })
                
                
            let pokemonAPI
            try{
                let dataAPI = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)).data
                pokemonAPI = {
                    id: dataAPI.id,
                    name: dataAPI.name,
                    types: filterTypesFromURL(dataAPI.types),
                    img: dataAPI.sprites.other.dream_world.front_default || 'https://raw.githubusercontent.com/itsjavi/pokemon-assets/master/assets/svg/pokeball.svg'
                }

            }catch(err){
                pokemonAPI = err
            }

            if(!pokemonsDB.length && pokemonAPI.name === 'Error') throw new Error('404')
            if(pokemonAPI.name === 'Error') return res.send(pokemonsDB)
                
            return res.send([...pokemonsDB,pokemonAPI])
            
        }catch(err){
            return err.message.includes('404') 
                ? res.status(404).send('No se pudo encontrar al pokemon')
                : res.status(500).send(`Server error: ${err}`)
        }
    },

    
    postPoke: async function(req, res){
        try{
            const {name, weight, height, img, hp, speed, attack, defense, types} = req.body
            //creo un nuevo pokemon con los datos traídos
            const dicIMG = ['svg','png','jpg','webp']
            let pimg = !img || !dicIMG.includes(img.slice(-3)) ? 
                'https://raw.githubusercontent.com/itsjavi/pokemon-assets/master/assets/svg/pokeball.svg' :
                img.trim()
            
            const poke = await Pokemon.create({
                name: name.toLowerCase().trim(),
                height,
                weight,
                img:pimg,
                hp,
                speed,
                attack,
                defense
            })
            await poke.addTypes(types) //para añadir los tipos a la tabla intermedia 
            let id = poke.id
            let posted = (await Pokemon.findByPk(id ,{
                attributes: {
                    exclude: ['createdAt', 'updatedAt','height','weight','speed','defense','attack',]
                },
                include: {
                    model: Type
                }
            })).toJSON()
            posted = {...posted, types: mapTypes(posted.types)}
            return res.status(201).send(posted)
        }catch(err){
            res.status(500).send(`Server error: ${err}`)
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
                    img: obj.sprites.other.dream_world.front_default || 'https://raw.githubusercontent.com/itsjavi/pokemon-assets/master/assets/svg/pokeball.svg',
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
    
    getTypes: async function(req,res){
        try{
            let types = await Type.findAll({
                attributes: ['name','id']
            })
           
            return res.send(types)
        }catch(err){
            return res.status(500).send(`Server error: ${err}`)
        }
    }
}