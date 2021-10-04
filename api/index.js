//ESTE ES EL DEL PROYECTO
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---=' 
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const axios = require('axios');
const server = require('./src/app.js');
const { conn, Type } = require('./src/db.js');

let types = [
  {
  name: "normal",
  url: "https://pokeapi.co/api/v2/type/1/"
  },
  {
  name: "fighting",
  url: "https://pokeapi.co/api/v2/type/2/"
  },
  {
  name: "flying",
  url: "https://pokeapi.co/api/v2/type/3/"
  },
  {
  name: "poison",
  url: "https://pokeapi.co/api/v2/type/4/"
  },
  {
  name: "ground",
  url: "https://pokeapi.co/api/v2/type/5/"
  },
  {
  name: "rock",
  url: "https://pokeapi.co/api/v2/type/6/"
  },
  {
  name: "bug",
  url: "https://pokeapi.co/api/v2/type/7/"
  },
  {
  name: "ghost",
  url: "https://pokeapi.co/api/v2/type/8/"
  },
  {
  name: "steel",
  url: "https://pokeapi.co/api/v2/type/9/"
  },
  {
  name: "fire",
  url: "https://pokeapi.co/api/v2/type/10/"
  },
  {
  name: "water",
  url: "https://pokeapi.co/api/v2/type/11/"
  },
  {
  name: "grass",
  url: "https://pokeapi.co/api/v2/type/12/"
  },
  {
  name: "electric",
  url: "https://pokeapi.co/api/v2/type/13/"
  },
  {
  name: "psychic",
  url: "https://pokeapi.co/api/v2/type/14/"
  },
  {
  name: "ice",
  url: "https://pokeapi.co/api/v2/type/15/"
  },
  {
  name: "dragon",
  url: "https://pokeapi.co/api/v2/type/16/"
  },
  {
  name: "dark",
  url: "https://pokeapi.co/api/v2/type/17/"
  },
  {
  name: "fairy",
  url: "https://pokeapi.co/api/v2/type/18/"
  },
  {
  name: "unknown",
  url: "https://pokeapi.co/api/v2/type/10001/"
  },
  {
  name: "shadow",
  url: "https://pokeapi.co/api/v2/type/10002/"
  }
  ]

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    try{
      // let types = (await axios.get('https://pokeapi.co/api/v2/type')).data.results
      types = types.map(type => ({
        name: type.name
      }))
      let prom = types.map(type=>Type.create(type))
      
      Promise.all(prom)
        .then(res => {
          console.log('Tipos precargados!') 
        }) 

    }catch(err){
      console.log('Error: ',err)
    }
    
  });
});
