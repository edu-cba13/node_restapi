const connect = require('../../config/connection_cartilla');
const Sequelize = require('sequelize');

const Barrios = require('../barrios/barrios.models');

const Localidades = connect.define('CART_LOCALIDADES', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    id_partido: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    descripcion: {
        type: Sequelize.STRING(60)
    },
    codigo_postal: {
        type: Sequelize.INTEGER
    }
}, {
    freezeTableName: true,
    tableName: 'CART_LOCALIDADES'
});

Localidades.hasMany(Barrios, { foreignKey: 'id_localidad', constraints: true, as: 'barrios' });

module.exports = Localidades;