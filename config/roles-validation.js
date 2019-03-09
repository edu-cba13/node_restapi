// Requires - importacion de librerias propias o terceros.
var jwt = require('jsonwebtoken');

// Inicializar variables
var SEED = require('./config').default.jwtSecret;

const requiereAdmin = (req, res, next) => {
    try {
        if (req.user.perfil === 'Administrador Cartilla') {
            next();
        } else {
            throw Error('Permission denied');
        }
    } catch (err) {
        res.status(401).json({
            message: "Permission denied",
            stack: ""
        });
    }
};

const requiereFarmacia = (req, res, next) => {
    try {
        if (req.user.perfil === 'Farmacias Cartilla') {
            next();
        } else {
            throw Error('Permission denied');
        }
    } catch (err) {
        res.status(401).json({
            message: "Permission denied",
            stack: ""
        });
    }
};

const requiereClinica = (req, res, next) => {
    try {
        if (req.user.perfil === 'Clínicas Cartilla') {
            next();
        } else {
            throw Error('Permission denied');
        }
    } catch (err) {
        res.status(401).json({
            message: "Permission denied",
            stack: ""
        });
    }
};

const requiereAltaComplejidad = (req, res, next) => {
    try {
        if (req.user.perfil === 'Clínicas Alta Complejidad Cartilla') {
            next();
        } else {
            throw Error('Permission denied');
        }
    } catch (err) {
        res.status(401).json({
            message: "Permission denied",
            stack: ""
        });
    }
};

const requiereProfesional = (req, res, next) => {
    try {
        if (req.user.perfil === 'Profesionales Cartilla') {
            next();
        } else {
            throw Error('Permission denied');
        }
    } catch (err) {
        res.status(401).json({
            message: "Permission denied",
            stack: ""
        });
    }
};

module.exports = {
    requiereAdmin,
    requiereFarmacia,
    requiereClinica,
    requiereAltaComplejidad,
    requiereProfesional
};