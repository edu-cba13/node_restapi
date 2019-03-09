const connect = require('../../config/connection_cartilla');
const Sequelize = require('sequelize');

const Partidos = require('../partidos/partidos.models');
const Localidades = require('../localidades/localidades.models');
const Barrios = require('../barrios/barrios.models');

const Entidades = require('../entidades/entidades.models');

const Telefonos = require('../telefonos/telefonos.models');
const Horarios = require('../horarios_atencion/horarios_atencion.models');

const Domicilios = connect.define('CART_DOMICILIOS', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_localidad: {
        type: Sequelize.INTEGER
    },
    id_partido: {
        type: Sequelize.INTEGER
    },
    id_barrio: {
        type: Sequelize.INTEGER
    },
    id_profesional: {
        type: Sequelize.INTEGER
    },
    id_farmacia: {
        type: Sequelize.INTEGER
    },
    id_clinica: {
        type: Sequelize.INTEGER
    },
    id_clinica_alta_complejidad: {
        type: Sequelize.INTEGER
    },
    codigo_postal: {
        type: Sequelize.INTEGER
    },
    calle: {
        type: Sequelize.STRING(80)
    },
    altura: {
        type: Sequelize.STRING(20)
    },
    piso: {
        type: Sequelize.STRING(20)
    },
    departamento: {
        type: Sequelize.STRING(10)
    },
    longitud: {
        type: Sequelize.INTEGER
    },
    latitud: {
        type: Sequelize.INTEGER
    },
    time_create: {
        type: Sequelize.DATE
    },
    time_modify: {
        type: Sequelize.DATE
    }
}, {
    freezeTableName: true,
    tableName: 'CART_DOMICILIOS'
});

Domicilios.belongsTo(Partidos, { targetKey: 'id', foreignKey: 'id_partido', as: 'partido' });

Domicilios.belongsTo(Localidades, { targetKey: 'id', foreignKey: 'id_localidad', as: 'localidad' });

Domicilios.belongsTo(Barrios, { targetKey: 'id', foreignKey: 'id_barrio', as: 'barrio' });

Domicilios.hasMany(Horarios, {
    foreignKey: 'id_domicilio',
    sourceKey: 'id',
    as: 'horarios_atencion',
    onDelete: 'cascade',
    hooks: true,
});

Domicilios.hasMany(Telefonos, {
    foreignKey: 'id_domicilio',
    sourceKey: 'id',
    as: 'telefonos',
    onDelete: 'cascade',
    hooks: true,
});

module.exports = Domicilios;