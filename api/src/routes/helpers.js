const axios = require('axios') 
const {Pokemon, Type} = require('../db.js')
module.exports = { 
    bringPokes: async function(){
        const datos1 = await axios.get('https://pokeapi.co/api/v2/pokemon')
        const next = datos1.data.next
        const pokes1 = datos1.data.results
        const datos2 = await axios.get(next)
        const pokes2 = datos2.data.results
        const pokesArr = [...pokes1,...pokes2]
        
        // const arr = pokesArr.map(poke => axios.get(poke.url))
        let arr = []
        pokesArr.forEach(poke=>arr.push(axios.get(poke.url)))
        Promise.all(arr).then(res => console.log('listo'))
        
        return
        

        // console.log(arr) 
        // console.log(arr[0])
    },

    postPoke: async function(pokemon){
        //pokemon trae: _nombre_, vida, fuerza, defensa, velocidad, _altura_, _peso_, _imagen_ tipos(array)
        const {name, weight, height, img, types} = pokemon
        //creo un nuevo pokemon con los datos traídos
        const poke = await Pokemon.create({
            name,
            height,
            weight,
            img
        })
        await poke.addTypes(types) //para añadir los tipos a la tabla intermedia 
       
    },

    findPoke: async function(id){
        
        let pokemon 
        if(id.length > 5){ //si el id coincide con db

            pokemon = (await Pokemon.findByPk(id, {
                include: Type
            })).toJSON()
        
        }else{ //si el id coincide con API

            let obj = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data
            
            pokemon = {
                name: obj.name,
                height: obj.height,
                id: id,
                weight: obj.weight,
                img: obj.sprites.other.dream_world.front_default,
                types: obj.types.map(t=>{
                    let arr = t.type.url.split('/')
                    return Number(arr[arr.length-2])
                })
            }
        }
        
        return pokemon 
    }
}