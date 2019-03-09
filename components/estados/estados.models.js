const connect = require('../../config/connection_cartilla');
const Sequelize = require('sequelize');

const Estados = connect.define('CART_ESTADOS', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    descripcion: {
        type: Sequelize.STRING(60),
        allowNull: false
    }
}, {
    freezeTableName: true,
    tableName: 'CART_ESTADOS'
});

module.exports = Estados;