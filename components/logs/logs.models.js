const connect = require('../../config/connection_cartilla');
const Sequelize = require('sequelize');


const Log = connect.define('CART_LOGS', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_object: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ip: {
        type: Sequelize.STRING(20)
    },
    date: {
        type: Sequelize.DATE
    },
    tipo: {
        type: Sequelize.STRING(50)
    },
    level: {
        type: Sequelize.STRING(50)
    },
    method: {
        type: Sequelize.STRING(50)
    },
    url: {
        type: Sequelize.TEXT
    },
    parameters: {
        type: Sequelize.TEXT
    },
    body: {
        type: Sequelize.TEXT
    },
    message: {
        type: Sequelize.TEXT
    }
}, {
    freezeTableName: true,
    tableName: 'CART_LOGS'
});


module.exports = Log;