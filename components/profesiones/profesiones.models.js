const connect = require('../../config/connection_cartilla');
const Sequelize = require('sequelize');

const Especiliadad = require('../especialidades_profesionales/especialidades_profesionales.models');

const Profesiones = connect.define('CART_PROFESIONES', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    descripcion: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
}, {
    freezeTableName: true,
    tableName: 'CART_PROFESIONES'
});

Profesiones.hasMany(Especiliadad, { foreignKey: 'id_profesion', constraints: true, as: 'especialidades' });

module.exports = Profesiones;