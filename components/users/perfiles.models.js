const connect = require('../../config/connection_comunes');
const Sequelize = require('sequelize');

const Perfiles = connect.define('SET_PERFILES', {
    PER_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    PER_NOMBRE: {
        type: Sequelize.STRING(63)
    },
    PER_DESCRIPCION: {
        type: Sequelize.STRING(255)
    }
});

module.exports = Perfiles;