// Requires - importacion de librerias propias o terceros.
const Sequelize = require('sequelize');
const sqs = require('sequelize-querystring');
const jwt = require('jsonwebtoken');
const SEED = require('../../config/config').default.jwtSecret;

const users = require('./users.models');
const users_entidades = require('./users_entidades.models');
const users_perfiles = require('./users_perfiles.models');
const Perfiles = require('./perfiles.models');
const EntidadesProfesiones = require('./entidades_profesiones.models');
const Entidades = require('../entidades/entidades.models');
const Profesiones = require('../profesiones/profesiones.models');

const login = async(req, res, next) => {
    try {
        let user = await users.findAndCountAll({
            where: {
                USU_LOGON: req.body.user,
                USU_CLAVE: req.body.password
            },
        });

        if (user.count === 0) {
            res.status(401).json({
                message: "Incorrect credentials",
                stack: ""
            });
        }

        let perfil = await users_perfiles.findAndCountAll({
            where: {
                APL_ID: 116, // Api Cartilla
                USU_ID: user.rows[0].USU_ID
            },
            include: [{
                model: Perfiles,
                as: 'perfil'
            }]
        });

        if (perfil.count === 0) {
            res.status(401).json({
                message: "The user does not have an assigned profile",
                stack: ""
            });
        }

        let perfilToken = {
            id: perfil.rows[0].perfil.PER_ID,
            nombre: perfil.rows[0].perfil.PER_NOMBRE
        };

        let entidad = await users_entidades.findAndCountAll({
            where: {
                id_user: user.rows[0].USU_ID
            },
            include: [{
                model: Entidades,
                as: 'entidad'
            }]
        });

        let entidadToken = {};

        if (perfil.rows[0].perfil.PER_NOMBRE === 'Entidad Cartilla' && entidad.count === 0) {
            res.status(401).json({
                message: "The user does not have an assigned entidad",
                stack: ""
            });
        } else {
            if (entidad.count !== 0) {
                entidadToken = {
                    id: entidad.rows[0].id_entidad,
                    nombre: entidad.rows[0].entidad.nombre,
                    codigo: entidad.rows[0].entidad.codigo,
                };
            } else {
                entidadToken = {};
            }
        }

        let userReturn = {
            id: user.rows[0].USU_ID,
            user: user.rows[0].USU_LOGON,
            entidad: entidadToken,
            perfil: perfilToken
        };

        let token = jwt.sign({ user: userReturn }, SEED, { expiresIn: '1h' }); // 4 horas
        res.json({
            user: user.rows[0].USU_LOGON,
            entidad: entidadToken,
            perfil: perfilToken,
            api_key: token
        });
    } catch (err) {
        next(err);
    }
};

const refresh = async(req, res, next) => {
    try {
        var decoded = jwt.verify(req.body.api_key, SEED);
        var token = jwt.sign({ user: decoded.user }, SEED, { expiresIn: '1h' }); // 4 horas
        res.json({
            user: decoded.user.user,
            entidad: decoded.user.entidadToken,
            perfil: decoded.user.perfilToken,
            api_key: token
        });
    } catch (err) {
        next(err);
    }
};


module.exports = { login, refresh };