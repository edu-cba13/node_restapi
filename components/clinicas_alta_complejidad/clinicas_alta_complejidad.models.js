const connect = require('../../config/connection_cartilla');
const Sequelize = require('sequelize');

const Domicilios = require('../domicilios/domicilios.models');

const Entidades = require('../entidades/entidades.models');

const Especialidades = require('../especialidades_alta_complejidad/especialidades_alta_complejidad.models');

const ClinciasAltaComplejidad = connect.define('CART_CLINICAS_ALTA_COMPLEJIDAD', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_especialidad_clinica_alta_complejidad: {
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
    nombre: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    razon_social: {
        type: Sequelize.STRING(100),
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
    tableName: 'CART_CLINICAS_ALTA_COMPLEJIDAD'
});

ClinciasAltaComplejidad.hasMany(Domicilios, {
    targetKey: 'id',
    foreignKey: 'id_clinica_alta_complejidad',
    as: 'domicilios',
    onDelete: 'cascade',
    hooks: true,
});

ClinciasAltaComplejidad.belongsTo(Especialidades, {
    targetKey: 'id',
    foreignKey: 'id_especialidad_clinica_alta_complejidad',
    as: 'especialidad'
});

ClinciasAltaComplejidad.belongsTo(Entidades, {
    targetKey: 'id',
    foreignKey: 'id_entidad',
    as: 'entidad'
});

ClinciasAltaComplejidad.belongsTo(Entidades, {
    targetKey: 'id',
    foreignKey: 'id_entidad_hijo',
    as: 'entidad_hijo'
});

module.exports = ClinciasAltaComplejidad;