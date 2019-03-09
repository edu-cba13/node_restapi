const connect = require('../../config/connection_cartilla');
const Sequelize = require('sequelize');

const EspecialidadesClinicasAltaComplejidad = connect.define('CART_ESPECIALIDADES_CLINICAS_ALTA_COMPLEJIDAD', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    descripcion: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    codigo: {
        type: Sequelize.STRING(50)
    }
}, {
    freezeTableName: true
});

module.exports = EspecialidadesClinicasAltaComplejidad;