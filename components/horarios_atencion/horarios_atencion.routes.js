const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');

// Controllers 
const horariosAtencion = require('./horarios_atencion.controllers');
const verificaUsers = require('../users/users.middlewares');

// Inicializar variables
const router = express.Router();


router.route('/')
    /** GET /api/horariosatencion - Get list of horarios atencion */
    .get(validate(paramValidation.params), horariosAtencion.list)
    /** POST /api/horariosatencion - Insert un horarios atencion */
    .post([validate(paramValidation.createHorariosAtencion),
            verificaUsers.verificaRole
        ],
        horariosAtencion.post);

router.route('/:id')
    /** GET /api/horariosatencion - Get list of horarios atencion */
    .get(validate(paramValidation.validateId), horariosAtencion.get)
    /** PUT /api/horariosatencion/:id - Update un horariosatencion */
    .put([validate(paramValidation.updateHorariosAtencion),
            verificaUsers.verificaRole
        ],
        horariosAtencion.put);


/** Load horarios atencion when API with horarios atencion Id route parameter is hit */
router.param('id', horariosAtencion.load);

module.exports = router;