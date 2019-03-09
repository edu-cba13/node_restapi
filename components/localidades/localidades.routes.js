const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');

// Controllers 
const localidad = require('./localidades.controllers');

// Inicializar variables
const router = express.Router();


router.route('/')
    /** GET /api/localidades - Get list of localidades */
    .get(validate(paramValidation.params), localidad.list);

router.route('/barrios')
    /** GET /api/localidads/barrios - Get list of localidades and barrios */
    .get(validate(paramValidation.params), localidad.getLocalidadesAndBarrios);


router.route('/:id')
    /** GET /api/localidades - Get localidad with id */
    .get(validate(paramValidation.validateId), localidad.get);


/** Load barrios when API with barrios Id route parameter is hit */
router.param('id', localidad.load);

module.exports = router;