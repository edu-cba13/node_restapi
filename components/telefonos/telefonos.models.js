const connect = require('../../config/connection_cartilla');
const Sequelize = require('sequelize');

const Telefonos = connect.define('CART_TELEFONOS', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    id_domicilio: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    codigo_area: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    numero: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    interno: {
        type: Sequelize.INTEGER
    },
    time_create: {
        type: Sequelize.DATE
    },
    time_modify: {
        type: Sequelize.DATE
    }
}, {
    freezeTableName: true,
    tableName: 'CART_TELEFONOS'
});

module.exports = Telefonos;