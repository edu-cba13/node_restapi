const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');

// Controllers 
const categorias = require('./categorias.controllers');

// Inicializar variables
const router = express.Router();


router.route('/')
    /** GET /api/categorias - Get list of categorias */
    .get(validate(paramValidation.params), categorias.list);

router.route('/:id')
    /** GET /api/categorias/:id - Get categoria with :id */
    .get(validate(paramValidation.validateId), categorias.get);


/** Load categorias when API with categorias Id route parameter is hit */
router.param('id', categorias.load);

module.exports = router;