const connect = require('../../config/connection_cartilla');
const Sequelize = require('sequelize');


const Especialidades = connect.define('CART_ESPECIALIDADES', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    id_profesion: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    descripcion: {
        type: Sequelize.STRING(150),
        allowNull: false
    }
}, {
    freezeTableName: true,
    tableName: 'CART_ESPECIALIDADES'
});

module.exports = Especialidades;