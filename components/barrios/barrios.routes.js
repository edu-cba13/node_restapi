const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');

// Controllers 
const barrios = require('./barrios.controllers');

// Inicializar variables
const router = express.Router();


router.route('/')
    /** GET /api/barrios - Get list of barrios ,*/
    .get(validate(paramValidation.params), barrios.list);

router.route('/:id')
    /** GET /api/barrios - Get list of barrios */
    .get(validate(paramValidation.validateId), barrios.get);


/** Load barrios when API with barrios Id route parameter is hit */
router.param('id', barrios.load);

module.exports = router;