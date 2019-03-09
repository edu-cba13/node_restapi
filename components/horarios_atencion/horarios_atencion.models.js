const connect = require('../../config/connection_cartilla');
const Sequelize = require('sequelize');

const HorariosAtencion = connect.define('CART_HORARIOS_ATENCION', {
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
    dia: {
        type: Sequelize.STRING(20)
    },
    desde_1: {
        type: Sequelize.STRING(5)
    },
    hasta_1: {
        type: Sequelize.STRING(5)
    },
    desde_2: {
        type: Sequelize.STRING(5)
    },
    hasta_2: {
        type: Sequelize.STRING(5)
    },
    time_create: {
        type: Sequelize.DATE
    },
    time_modify: {
        type: Sequelize.DATE
    }
}, {
    freezeTableName: true,
    tableName: 'CART_HORARIOS_ATENCION'
});

module.exports = HorariosAtencion;