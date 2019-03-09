const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const genericValidation = require('../../config/generic-validation');

const verificaUsers = require('../users/users.middlewares');

// Controllers 
const clinicas = require('./clinicas.controllers');

// Inicializar variables
const router = express.Router();

router.route('/')
    /** GET /api/clinicas - Get list of clinicas */
    .get(validate(paramValidation.params), clinicas.list)
    /** POST /api/clinicas - Insert clinicas */
    .post([validate(paramValidation.createClinicas),
            verificaUsers.verificaRole,
            verificaUsers.verificaEntidad,
            genericValidation.requiereCuit
        ],
        clinicas.post);

router.route('/domicilios')
    /** GET /api/clinicas/domicilios - Get list of clinicas and domicilios */
    .get(validate(paramValidation.params), clinicas.getClinicasAndDomicilios);

router.route('/:id')
    /** GET /api/clinicas/:id - Get clinicas with id */
    .get(validate(paramValidation.validateId), clinicas.get)
    /** PUT /api/clinicas - Update clinicas and domicilios*/
    .put([validate(paramValidation.updateClinicas),
            verificaUsers.verificaRole,
            verificaUsers.verificaEntidad,
            genericValidation.requiereCuit,
            genericValidation.requiereIdsEqueals
        ],
        clinicas.put)
    /** DELETE /api/clinicas/:id - Delete clinicas and domicilios with id */
    .delete(clinicas.deleted);


/** Load clinicas when API with clinicas Id route parameter is hit */
router.param('id', clinicas.load);

module.exports = router