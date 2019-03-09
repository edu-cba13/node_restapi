const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');

// Controllers 
const usuario = require('./users.controllers');

// Inicializar variables
const router = express.Router();

router.route('/login')
    /** Post /api/usuarios/login - Get token */
    .post(validate(paramValidation.login), usuario.login);

router.route('/refresh')
    /** Post /api/usuarios/refresh - Get actualiza token */
    .post(validate(paramValidation.refresh), usuario.refresh);


module.exports = router;