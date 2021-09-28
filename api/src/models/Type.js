const Sequelize = require('sequelize'); 
const S = Sequelize;

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('type', {
        id: {
            type: S.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: S.DataTypes.STRING,
            allowNull: false
        }
    })
}