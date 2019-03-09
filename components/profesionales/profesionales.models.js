const connect = require('../../config/connection_cartilla');
const Sequelize = require('sequelize');

const Categorias = require('../categorias/categorias.models');
const Estados = require('../estados/estados.models');

const Especialidades = require('../especialidades_profesionales/especialidades_profesionales.models');
const Profesiones = require('../profesiones/profesiones.models');

const Domicilios = require('../domicilios/domicilios.models');

const Entidades = require('../entidades/entidades.models');

const Profesionales = connect.define('CART_PROFESIONALES', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_estado: {
        type: Sequelize.INTEGER
    },
    id_categoria: {
        type: Sequelize.INTEGER
    },
    id_profesion: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_especialidad: {
        type: Sequelize.INTEGER,
        allowNull: true
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
    apellido: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    cuit: {
        type: Sequelize.STRING(11)
    },
    matricula_provincial: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    matricula_nacional: {
        type: Sequelize.INTEGER
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
    tableName: 'CART_PROFESIONALES'
});

Profesionales.belongsTo(Categorias, {
    foreignKey: 'id_categoria',
    targetKey: 'id',
    as: 'categoria'
});

Profesionales.belongsTo(Estados, {
    foreignKey: 'id_estado',
    targetKey: 'id',
    as: 'estado'
});

Profesionales.belongsTo(Profesiones, {
    targetKey: 'id',
    foreignKey: 'id_profesion',
    as: 'profesion'
});

Profesionales.belongsTo(Especialidades, {
    targetKey: 'id',
    foreignKey: 'id_especialidad',
    as: 'especialidad'
});

Profesionales.belongsTo(Entidades, {
    targetKey: 'id',
    foreignKey: 'id_entidad',
    as: 'entidad'
});

Profesionales.belongsTo(Entidades, {
    targetKey: 'id',
    foreignKey: 'id_entidad_hijo',
    as: 'entidad_hijo'
});


Profesionales.hasMany(Domicilios, {
    targetKey: 'id',
    foreignKey: 'id_profesional',
    as: 'domicilios',
    onDelete: 'cascade',
    hooks: true,
});

module.exports = Profesionales;