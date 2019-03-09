const connect = require('../../config/connection_cartilla');
const Sequelize = require('sequelize');

const Domicilios = require('../domicilios/domicilios.models');

const Entidades = require('../entidades/entidades.models');

const Farmacias = connect.define('CART_Farmacias', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING(60),
        allowNull: false
    },
    razon_social: {
        type: Sequelize.STRING(60)
    },
    cuit: {
        type: Sequelize.STRING(11),
        allowNull: false
    },
    id_entidad: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_entidad_hijo: {
        type: Sequelize.INTEGER
    },
    estado_prestador: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    estado_ioma: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    time_create: {
        type: Sequelize.DATE
    },
    time_modify: {
        type: Sequelize.DATE
    }
});

Farmacias.hasMany(Domicilios, {
    targetKey: 'id',
    foreignKey: 'id_farmacia',
    as: 'domicilios',
    onDelete: 'cascade',
    hooks: true,
});

Farmacias.belongsTo(Entidades, {
    targetKey: 'id',
    foreignKey: 'id_entidad',
    as: 'entidad'
});

Farmacias.belongsTo(Entidades, {
    targetKey: 'id',
    foreignKey: 'id_entidad_hijo',
    as: 'entidad_hijo'
});

module.exports = Farmacias;