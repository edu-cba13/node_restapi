const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const genericValidation = require('../../config/generic-validation');
const fileValidation = require('../../config/file-validation');

// Usuario validate
const verificaUsers = require('../users/users.middlewares');

// Controllers 
const profesionales = require('./profesionales.controllers');

// Inicializar variables
const router = express.Router();

// File Csv Middlewares
const multer = require('multer');
let upload = multer({ dest: 'tpm/uploads/' });

router.route('/')
    /** GET /api/profesionales - Get list of profesionales */
    .get(validate(paramValidation.params), profesionales.list)
    /** POST /api/profesionales - Insert un profesionales */
    .post([validate(paramValidation.createProfesional),
            verificaUsers.verificaRole,
            verificaUsers.verificaEntidad,
            genericValidation.requiereCuit
        ],
        profesionales.post);

router.route('/domicilios')
    /** GET /api/profesionales/domicilios - Get list of profesionales and domiclios*/
    .get(validate(paramValidation.params), profesionales.getProfesionalesAndDomicilios);

router.route('/:id')
    /** GET /api/profesionales/:id - Get profesionales with id */
    .get(validate(paramValidation.validateId), profesionales.get)
    /** PUT /api/profesionales/:id - Udapre un profesionales */
    .put([validate(paramValidation.updateProfesional),
            verificaUsers.verificaRole,
            verificaUsers.verificaEntidad,
            genericValidation.requiereCuit,
            genericValidation.requiereIdsEqueals
        ],
        profesionales.put)
    /** DELETE /api/profesionales/:id - Delet un profesionales and domicilios */
    .delete(verificaUsers.verificaRole, profesionales.deleted);

router.route('/array/:id_entidad')
    /** POST /api/profesionales/array/:id_entidad - Deleted and insert profesionales */
    .post([validate(paramValidation.createProfesionales)],
        verificaUsers.verificaEntidadParam,
        verificaUsers.verificaRole,
        profesionales.postArray);

router.route('/csvtojson')
    /** POST /api/profesionales/csvtojson - Convert csv to json schema profesionales */
    .post(upload.single('file'), profesionales.postCsv);

/** Load profesionales when API with profesionales Id route parameter is hit */
router.param('id', profesionales.load);

module.exports = router;