const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');

// Controllers 
const especialidadclinica = require('./especialidades_clinicas.controllers');

// Inicializar variables
const router = express.Router();


router.route('/')
    /** GET /api/especialidadclinica - Get list of especialidadclinica */
    .get(validate(paramValidation.params), especialidadclinica.list);

router.route('/:id')
    /** GET /api/especialidadclinica/:id - Get especialidadclinicawith :id */
    .get(validate(paramValidation.validateId), especialidadclinica.get);


/** Load especialidadclinica when API with especialidadclinica Id route parameter is hit */
router.param('id', especialidadclinica.load);

module.exports = router;