// Requires - importacion de librerias propias o terceros.
let jwt = require('jsonwebtoken');

// Inicializar variables
let SEED = require('../../config/config').default.jwtSecret;

// Perfiles
let { ADMINISTRADOR, EMPLEADO, ENTIDAD, CONSULTA } = require('./perfiles');

const verificaToken = (req, res, next) => {
    try {
        var token = req.headers.api_key;
        var decoded = jwt.verify(token, SEED);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({
            message: "Invalid token",
            stack: ""
        });
    }
}

const verificaRole = (req, res, next) => {
    try {
        let perfil = req.user.perfil;
        if (perfil.nombre === ADMINISTRADOR) {
            next();
        } else if (perfil.nombre === ENTIDAD) {
            next();
        } else if (perfil.nombre === EMPLEADO) {
            next();
        } else if (perfil.nombre === CONSULTA) {
            throw Error('Invalid role');
        }
    } catch (err) {
        res.status(401).json({
            message: "Invalid role",
            stack: ""
        });
    }
}

const verificaEntidad = (req, res, next) => {
    try {
        let perfil = req.user.perfil;
        let entidad = req.user.entidad;
        if (perfil.nombre === ENTIDAD) {
            if (entidad.id !== req.body.id_entidad) {
                throw Error(`Access denied to modify the entidad with id ${req.body.id_entidad}`);
            }
        }
        next();
    } catch (err) {
        res.status(401).json({
            message: `Access denied to modify the entidad with id ${req.body.id_entidad}`,
            stack: ""
        });
    }
}


const verificaEntidadParam = (req, res, next) => {
    try {
        let perfil = req.user.perfil;
        let entidad = req.user.entidad;
        if (perfil.nombre === ENTIDAD) {
            if (entidad.id !== req.params.id_entidad) {
                throw Error(`Access denied to modify the entidad with id ${req.params.id_entidad}`);
            }
        }
        next();
    } catch (err) {
        res.status(401).json({
            message: `Access denied to modify the entidad with id ${req.params.id_entidad}`,
            stack: ""
        });
    }
}

//------
const verificaEntidadSetEstadoIoma = (req, res, next) => {
    try {
        let perfil = req.user.perfil;
        let entidad = req.user.entidad;
        if (perfil.nombre === ENTIDAD) {
            throw Error(`Cannot set state \"estado_ioma\"`);
        }
        next();
    } catch (err) {
        res.status(400).json({
            message: `Cannot set state \"estado_ioma\"`,
            stack: ""
        });
    }
}

module.exports = {
    verificaToken,
    verificaRole,
    verificaEntidad,
    verificaEntidadParam,
    verificaEntidadSetEstadoIoma
};