const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const genericValidation = require('../../config/generic-validation');

const verificaUsers = require('../users/users.middlewares');

// Controllers 
const clinciasAltaComplejidad = require('./clinicas_alta_complejidad.controllers');

// Inicializar variables
const router = express.Router();

router.route('/')
    /** GET /api/clinciasaltacomplejidad - Get list of clincias alta complejidad */
    .get(validate(paramValidation.params), clinciasAltaComplejidad.list)
    /** POST /api/clinciasaltacomplejidad - Insert clincias alta complejidad and domicilios*/
    .post([validate(paramValidation.createClinciasAltaComplejidad),
            verificaUsers.verificaRole,
            verificaUsers.verificaEntidad,
            genericValidation.requiereCuit
        ],
        clinciasAltaComplejidad.post);

router.route('/domicilios')
    /** GET /api/clinciasaltacomplejidad/domicilios - Get list of clincias alta complejidad and domicilios */
    .get(validate(paramValidation.params), clinciasAltaComplejidad.getClinicaAltaComplejidadAndDomicilios);

router.route('/:id')
    /** GET /api/clinciasaltacomplejidad/:id - Get clincias alta complejidad with id */
    .get(validate(paramValidation.validateId), clinciasAltaComplejidad.get)
    /** PUT /api/clinciasaltacomplejidad - Update clincias alta complejidad and domicilios*/
    .put([validate(paramValidation.updateClinciasAltaComplejidad),
            verificaUsers.verificaRole,
            verificaUsers.verificaEntidad,
            genericValidation.requiereCuit,
            genericValidation.requiereIdsEqueals
        ],
        clinciasAltaComplejidad.put)
    /** DELETE /api/clinciasaltacomplejidad/:id - Delete clincias alta complejidad and domicilios with id */
    .delete(clinciasAltaComplejidad.deleted);

/** Load clinciasaltacomplejidad when API with clincias alta complejidad Id route parameter is hit */
router.param('id', clinciasAltaComplejidad.load);

module.exports = router;