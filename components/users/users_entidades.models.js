const connect = require('../../config/connection_cartilla');
const Sequelize = require('sequelize');

const Entidades = require('../entidades/entidades.models');

const Usuarios_Entidades = connect.define('CART_USUARIOS_ENTIDADES', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    id_entidad: {
        type: Sequelize.INTEGER
    },
    id_user: {
        type: Sequelize.INTEGER
    },
});

Usuarios_Entidades.belongsTo(Entidades, {
    targetKey: 'id',
    foreignKey: 'id_entidad',
    as: 'entidad'
});

module.exports = Usuarios_Entidades;