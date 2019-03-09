const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const genericValidation = require('../../config/generic-validation');

const verificaUsers = require('../users/users.middlewares');

// Controllers 
const farmacias = require('./farmacias.controllers');

// Inicializar variables
const router = express.Router();

router.route('/')
    /** GET /api/farmacias - Get list of farmacias */
    .get(validate(paramValidation.params), farmacias.list)
    /** POST /api/farmacias - Insert farmacias */
    .post([validate(paramValidation.createFarmacias),
        verificaUsers.verificaRole,
        verificaUsers.verificaEntidad,
        genericValidation.requiereCuit
    ], farmacias.post);


router.route('/domicilios')
    /** GET /api/farmacias/domicilios - Get list of farmacias and domicilios */
    .get(validate(paramValidation.params), farmacias.getFarmaciasAndDomicilios);

router.route('/:id')
    /** GET /api/farmacias/:id - Get farmacias with id */
    .get(validate(paramValidation.validateId), farmacias.get)
    /** PUT /api/farmacias - Update farmacias and domicilios */
    .put([validate(paramValidation.updateFarmacias),
            verificaUsers.verificaRole,
            verificaUsers.verificaEntidad,
            genericValidation.requiereCuit,
            genericValidation.requiereIdsEqueals
        ],
        farmacias.put)
    /** DELETE /api/farmacias/:id - Delete farmacias with id and domicilios*/
    .delete(farmacias.deleted);


/** Load farmacias when API with farmacias Id route parameter is hit */
router.param('id', farmacias.load);

module.exports = router;