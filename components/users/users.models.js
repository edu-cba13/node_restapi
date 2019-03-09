const connect = require('../../config/connection_comunes');
const Sequelize = require('sequelize');

const Usuarios = connect.define('SET_USUARIOS', {
    USU_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    USU_NOMBRE: {
        type: Sequelize.STRING(63)
    },
    USU_APELLIDO: {
        type: Sequelize.STRING(63)
    },
    USU_LOGON: {
        type: Sequelize.STRING(180)
    },
    USU_CLAVE: {
        type: Sequelize.STRING(50)
    },
    USU_MAIL: {
        type: Sequelize.STRING(180)
    },
    USU_ACCESO: {
        type: Sequelize.STRING(12)
    },
    USU_FECHA_ALTA: {
        type: Sequelize.DATE
    },
    USU_FECHA_BAJA: {
        type: Sequelize.DATE
    },
    USU_DOC: {
        type: Sequelize.INTEGER
    },
    USU_CUIT: {
        type: Sequelize.STRING(11)
    },
    USU_TEL: {
        type: Sequelize.STRING(50)
    },
    USU_LEGAJO: {
        type: Sequelize.STRING(10)
    }
});

module.exports = Usuarios;