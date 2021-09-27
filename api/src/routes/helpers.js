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
    bringAllPokes: async function(){
        
        const datos1 = (await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40')).data

        const pokesArr = datos1.results

        let arr = []
        for(let i=0; i<pokesArr.length;i++){
            arr.push(axios.get(pokesArr[i].url))          
        }        
         
        let result = (await Promise.all(arr)).map(poke=>{
            return ({
            id: poke.data.id,
            name: poke.data.name,
            types: filterTypesFromURL(poke.data.types),
            img: poke.data.sprites.other.dream_world.front_default
        })})
        return result
        
    },

    postPoke: async function(pokemon){
        //pokemon trae: _nombre_, vida, ataque, defensa, velocidad, _altura_, _peso_, _imagen_ tipos(array)
        const {name, weight, height, img, hp, speed, attack, defense, types} = pokemon
        //creo un nuevo pokemon con los datos traídos
        const poke = await Pokemon.create({
            name: name.slice(0,1).toUpperCase()+name.slice(1),
            height,
            weight,
            img,
            hp,
            speed,
            attack,
            defense
        })
        await poke.addTypes(types) //para añadir los tipos a la tabla intermedia 
       
    },

    findPokeByID: async function(id){
        
        let pokemon 
        try{
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
                    img: obj.sprites.other.dream_world.front_default,
                    gif: obj.sprites.versions['generation-v']['black-white'].animated.front_default,
                    types: filterTypesFromURL(obj.types)
                }
            }
            return pokemon 
        }catch(err){
            return err
        }
    },
    findPokeByName: async function(name){

        try{
            if(name[0]===name[0].toUpperCase()){ //esto buscará solo en la base de datos
                let data = await Pokemon.findAll({
                    where: {
                        name: name
                    },
                    include: {
                        model: Type
                    }
                }) 
                if(data.length === 0) throw new Error('No se encontró')

                let pokemons = data.map(poke=>{
                    return ({
                        id: poke.id,
                        name:poke.name,
                        img:poke.img,
                        types: mapTypes(poke.types)
                    })
                })
                return pokemons  
            }else{ //aquí entrará solo para buscar en la API
                let data = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)).data
                let pokemon = {
                    id: data.id,
                    name: data.name,
                    types: filterTypesFromURL(data.types),
                    img: data.sprites.other.dream_world.front_default
                }
                return pokemon
            }
        }catch(err){
            return err
        }
    }
}