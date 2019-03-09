const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');

// Controllers 
const telefonos = require('./telefonos.controllers');
const verificaUsers = require('../users/users.middlewares');

// Inicializar variables
const router = express.Router();


router.route('/')
    /** GET /api/telefonos - Get list of telefonos */
    .get(validate(paramValidation.params), telefonos.list)
    /** POST /api/telefonos - Insert un telefonos */
    .post([validate(paramValidation.createTelefonos),
            verificaUsers.verificaRole
        ],
        telefonos.post);

router.route('/:id')
    /** GET /api/telefonos - Get list of telefonos */
    .get(validate(paramValidation.validateId), telefonos.get)
    /** PUT /api/telefonos/:id - Update un telefonos */
    .put([validate(paramValidation.updateTelefonos),
            verificaUsers.verificaRole
        ],
        telefonos.put);


/** Load telefonos when API with telefonos Id route parameter is hit */
router.param('id', telefonos.load);

module.exports = router;