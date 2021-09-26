const axios = require('axios') 
module.exports = { 
    bringPokes: async function(){
        const datos1 = await axios.get('https://pokeapi.co/api/v2/pokemon')
        const next = datos1.data.next
        const pokes1 = datos1.data.results
        const datos2 = await axios.get(next)
        const pokes2 = datos2.data.results
        const pokesArr = [...pokes1,...pokes2]
        
        return pokesArr
        

        // console.log(arr) 
        // console.log(arr[0])
    }
}