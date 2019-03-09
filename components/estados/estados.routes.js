const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');

// Controllers 
const estados = require('./estados.controllers');

// Inicializar variables
const router = express.Router();

router.route('/')
    /** GET /api/estados - Get list of estados */
    .get(validate(paramValidation.params), estados.list);

router.route('/:id')
    /** GET /api/estados/:id - Get estados with id */
    .get(validate(paramValidation.validateId), estados.get);


/** Load estados when API with estados Id route parameter is hit */
router.param('id', estados.load);

module.exports = router;