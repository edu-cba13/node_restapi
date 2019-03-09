const connect = require('../../config/connection_cartilla');
const Sequelize = require('sequelize');

const Entidades = connect.define('CART_ENTIDADES', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING(150)
    },
    estado: {
        type: Sequelize.BOOLEAN
    },
    codigo: {
        type: Sequelize.INTEGER
    },
    date: {
        type: Sequelize.DATE
    },
    categoria: {
        type: Sequelize.STRING(150)
    }
}, {
    freezeTableName: true,
    tableName: 'CART_ENTIDADES'
});

//Entidades.hasMany(Domicilios, { foreignKey: 'id_entidad', sourceKey: 'id', as: 'domiclio' });

module.exports = Entidades;