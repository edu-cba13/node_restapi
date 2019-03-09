const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');

// Controllers 
const profesiones = require('./profesiones.controllers');

// Inicializar variables
const router = express.Router();

router.route('/')
    /** GET /api/profesiones - Get list of profesiones */
    .get(validate(paramValidation.params), profesiones.list);

router.route('/especialidades')
    /** GET /api/profesiones - Get list of profesiones and especialidades */
    .get(validate(paramValidation.params), profesiones.getProfesionesAndEspeicalidades);

router.route('/:id')
    /** GET /api/profesiones/:id - Get profesiones with id */
    .get(validate(paramValidation.validateId), profesiones.get);


/** Load profesiones when API with profesiones Id route parameter is hit */
router.param('id', profesiones.load);

module.exports = router;