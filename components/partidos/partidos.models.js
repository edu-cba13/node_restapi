const connect = require('../../config/connection_cartilla');
const Sequelize = require('sequelize');

const Localidades = require('../localidades/localidades.models');

const Partidos = connect.define('CART_PARTIDOS', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    descripcion: {
        type: Sequelize.STRING(60)
    }
}, {
    freezeTableName: true,
    tableName: 'CART_PARTIDOS'
});

Partidos.hasMany(Localidades, {
    foreignKey: 'id_partido',
    as: 'localidades',
    constraints: true
});

module.exports = Partidos;