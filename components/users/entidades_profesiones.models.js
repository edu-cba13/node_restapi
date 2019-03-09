const connect = require('../../config/connection_cartilla');
const Sequelize = require('sequelize');

const Profesiones = require('../profesiones/profesiones.models');

const Entidades_Profesiones = connect.define('CART_ENTIDADES_PROFESIONES', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    id_entidad: {
        type: Sequelize.INTEGER
    },
    id_profesion: {
        type: Sequelize.INTEGER
    },
});

Entidades_Profesiones.belongsTo(Profesiones, {
    targetKey: 'id',
    foreignKey: 'id_profesion',
    as: 'profesion'
});

module.exports = Entidades_Profesiones;