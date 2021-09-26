const Sequelize = require('sequelize'); 
const S = Sequelize;

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: S.DataTypes.UUID,
      defaultValue: S.DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: S.DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: S.DataTypes.INTEGER
    },
    weight: {
      type: S.DataTypes.INTEGER
    },
    img : {
      type: S.DataTypes.STRING,
      validate: {
        isUrl: true
      }
    }
    // life: {

    // },
    // strength: {

    // },
    // defense: {

    // },
    // velocity: {

    // },
  });
};
