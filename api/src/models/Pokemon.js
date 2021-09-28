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
      type: S.DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: S.DataTypes.INTEGER,
      allowNull: false,
    },
    img : {
      type: S.DataTypes.TEXT,
    },
    gif : {
      type: S.DataTypes.TEXT
    },
    hp: { //vida
      type: S.DataTypes.INTEGER,
      allowNull: false
    },
    attack: {
      type: S.DataTypes.INTEGER,
      allowNull: false
    },
    defense: {
      type: S.DataTypes.INTEGER,
      allowNull: false
    },
    speed: {
      type: S.DataTypes.INTEGER,
      allowNull: false
    }
  });
};
