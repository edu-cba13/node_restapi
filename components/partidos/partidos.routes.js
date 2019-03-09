const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');

// Controllers 
const partidos = require('./partidos.controllers');

// Inicializar variables
const router = express.Router();


router.route('/')
    /** GET /api/partidos - Get list of partidos */
    .get(validate(paramValidation.params), partidos.list);

router.route('/localidades')
    /** GET /api/partidos/localidades - Get list of partidos and localidades */
    .get(validate(paramValidation.params), partidos.getPartidosAndLocalidades);

router.route('/localidades/barrios')
    /** GET /api/partidos/localidades/barrios - Get list of partidos and localidades and barrios */
    .get(validate(paramValidation.params), partidos.getPartidosAndLocalidadesAndBarrios);

router.route('/:id')
    /** GET /api/partidos - Get partidos with id */
    .get(validate(paramValidation.validateId), partidos.get);


/** Load partidos when API with partidos Id route parameter is hit */
router.param('id', partidos.load);

module.exports = router;