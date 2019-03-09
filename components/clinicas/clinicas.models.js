const connect = require('../../config/connection_cartilla');
const Sequelize = require('sequelize');

const Domicilios = require('../domicilios/domicilios.models');

const Entidades = require('../entidades/entidades.models');

const Especialidades = require('../especialidades_clinicas/especialidades_clinicas.models');

const Clinicas = connect.define('CART_CLINICAS', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_especialidad_clinica: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_entidad: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_entidad_hijo: {
        type: Sequelize.INTEGER
    },
    razon_social: {
        type: Sequelize.STRING(60),
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING(60),
        allowNull: false
    },
    cuit: {
        type: Sequelize.STRING(11),
        allowNull: false
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
}, {
    freezeTableName: true,
    tableName: 'CART_CLINICAS'
});

Clinicas.hasMany(Domicilios, {
    targetKey: 'id',
    foreignKey: 'id_clinica',
    as: 'domicilios',
    onDelete: 'cascade',
    hooks: true,
});

Clinicas.belongsTo(Especialidades, {
    targetKey: 'id',
    foreignKey: 'id_especialidad_clinica',
    as: 'especialidad'
});

Clinicas.belongsTo(Entidades, {
    targetKey: 'id',
    foreignKey: 'id_entidad',
    as: 'entidad'
});

Clinicas.belongsTo(Entidades, {
    targetKey: 'id',
    foreignKey: 'id_entidad_hijo',
    as: 'entidad_hijo'
});


module.exports = Clinicas;