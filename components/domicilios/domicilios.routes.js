const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const genericValidation = require('../../config/generic-validation');

const verificaUsers = require('../users/users.middlewares');

// Controllers 
const domicilios = require('./domicilios.controllers');

// Inicializar variables
const router = express.Router();

router.route('/')
    /** GET /api/domicilios - Get list of domicilios */
    .get(validate(paramValidation.params), domicilios.list)
    /** POST /api/domicilios - Insert un domicilio */
    .post([validate(paramValidation.createDomicilios),
            verificaUsers.verificaRole
        ],
        domicilios.post);

router.route('/:id')
    /** GET /api/domicilios/:id - Get domicilios with id */
    .get(validate(paramValidation.validateId), domicilios.get)
    /** PUT /api/domicilios/:id - Udapre un domicilios */
    .put([validate(paramValidation.updateDomicilios),
        verificaUsers.verificaRole,
        genericValidation.requiereIdsEqueals
    ], domicilios.put)
    /** DELETE /api/domicilios/:id - Delet un domicilios and telefonos and horarios de atencion */
    .delete(verificaUsers.verificaRole, domicilios.deleted);


/** Load domicilios when API with domicilios Id route parameter is hit */
router.param('id', domicilios.load);

module.exports = router;