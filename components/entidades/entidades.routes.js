const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');

// Controllers 
const entidades = require('./entidades.controllers');

// Inicializar variables
const router = express.Router();

router.route('/')
    /** GET /api/entidades - Get list of entidades */
    .get(validate(paramValidation.params), entidades.list);

router.route('/:id')
    /** GET /api/entidades - Get list of entidades */
    .get(validate(paramValidation.validateId), entidades.get);


/** Load entidades when API with entidades Id route parameter is hit */
router.param('id', entidades.load);

module.exports = router;