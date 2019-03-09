const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');

// Controllers 
const especialidad = require('./especialidades_profesionales.controllers');

// Inicializar variables
const router = express.Router();


router.route('/')
    /** GET /api/especialidades - Get list of especialidades */
    .get(validate(paramValidation.params), especialidad.list);

router.route('/:id')
    /** GET /api/especialidades/:id - Get especialidades with :id */
    .get(validate(paramValidation.validateId), especialidad.get);


/** Load especialidades when API with especialidades Id route parameter is hit */
router.param('id', especialidad.load);

module.exports = router;