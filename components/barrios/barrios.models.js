const connect = require('../../config/connection_cartilla');
const Sequelize = require('sequelize');


const Barrios = connect.define('CART_BARRIOS', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    id_localidad: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    codigo_postal: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    descripcion: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
}, {
    freezeTableName: true,
    tableName: 'CART_BARRIOS'
});

module.exports = Barrios;