const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');

// Controllers 
const altacomplejidad = require('./especialidades_alta_complejidad.controllers');

// Inicializar variables
const router = express.Router();


router.route('/')
    /** GET /api/clinicasaltacomplejidad - Get list of especialidades alta complejidad */
    .get(validate(paramValidation.params), altacomplejidad.list);

router.route('/:id')
    /** GET /api/clinicasaltacomplejidad/:id - Get especialidades alta complejidad with :id */
    .get(validate(paramValidation.validateId), altacomplejidad.get);


/** Load especialidades alta complejidad when API with especialidades alta complejidad Id route parameter is hit */
router.param('id', altacomplejidad.load);

module.exports = router;