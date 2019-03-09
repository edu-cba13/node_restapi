const connect = require('../../config/connection_cartilla');
const Sequelize = require('sequelize');

const Categorias = connect.define('CART_CATEGORIAS', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    descripcion: {
        type: Sequelize.STRING(60),
        allowNull: false
    }
}, {
    freezeTableName: true,
    tableName: 'CART_CATEGORIAS'
});

module.exports = Categorias;