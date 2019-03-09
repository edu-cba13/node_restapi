const connect = require('../../config/connection_comunes');
const Sequelize = require('sequelize');

const Perfiles = require('./perfiles.models');

const Usuarios_Perfiles = connect.define('SET_PERFILES_USUARIOS', {
    PER_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    USU_ID: {
        type: Sequelize.INTEGER
    },
    APL_ID: {
        type: Sequelize.INTEGER
    },
});

Usuarios_Perfiles.belongsTo(Perfiles, {
    targetKey: 'PER_ID',
    foreignKey: 'PER_ID',
    as: 'perfil'
});

module.exports = Usuarios_Perfiles;