const express = require('express');
const tokenValidation = require('./components/users/users.middlewares');

// Routes
const entidadesRoutes = require('./components/entidades/entidades.routes');
const especlinicasRoutes = require('./components/especialidades_clinicas/especialidades_clinicas.routes');
const espealtaclomplejidadRoutes = require('./components/especialidades_alta_complejidad/especialidades_alta_complejidad.routes');
const partidosRoutes = require('./components/partidos/partidos.routes');
const localidadesRoutes = require('./components/localidades/localidades.routes');
const barriosRoutes = require('./components/barrios/barrios.routes');
const profesionesRoutes = require('./components/profesiones/profesiones.routes');
const profesionalesRoutes = require('./components/profesionales/profesionales.routes');
const especialidadesRoutes = require('./components/especialidades_profesionales/especialidades_profesionales.routes');
const categoriasRoutes = require('./components/categorias/categorias.routes');
const estadosRoutes = require('./components/estados/estados.routes');
const farmaciasRoutes = require('./components/farmacias/farmacias.routes');
const usersRoutes = require('./components/users/users.routes');
const clinciasaltacomplejidadRoutes = require('./components/clinicas_alta_complejidad/clinicas_alta_complejidad.routes');
const clinicasRoutes = require('./components/clinicas/clinicas.routes');
const domiciliosRoutes = require('./components/domicilios/domicilios.routes');
const telefonosRoutes = require('./components/telefonos/telefonos.routes');
const horariosatencionRoutes = require('./components/horarios_atencion/horarios_atencion.routes');
const yaml = require('./components/yaml/cartilla.json');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/v1/health-check', (req, res) =>
    res.status(200).json({
        message: 'Service Up!'
    })
);

/** GET /documentation - Api documentation */
router.get('/v1/documentation', (req, res) =>
    res.send(yaml)
);

// mount users routes at /users
router.use('/v1/users', usersRoutes);

// mount entidades routes at /entidades
router.use('/v1/entidades', tokenValidation.verificaToken, entidadesRoutes);

// mount especialidadesclinicas routes at /especialidadesclinicas
router.use('/v1/especialidadesclinicas', tokenValidation.verificaToken, especlinicasRoutes);

// mount especialidadesaltacomplejidad routes at /especialidadesaltacomplejidad
router.use('/v1/especialidadesaltacomplejidad', tokenValidation.verificaToken, espealtaclomplejidadRoutes);

// mount partidos routes at /partidos
router.use('/v1/partidos', tokenValidation.verificaToken, partidosRoutes);

// mount localidades routes at /localidades
router.use('/v1/localidades', tokenValidation.verificaToken, localidadesRoutes);

// mount barrios routes at /barrios
router.use('/v1/barrios', tokenValidation.verificaToken, barriosRoutes);

// mount profesiones routes at /profesiones
router.use('/v1/profesiones', tokenValidation.verificaToken, profesionesRoutes);

// mount especialidades routes at /especialidades
router.use('/v1/especialidades', tokenValidation.verificaToken, especialidadesRoutes);

// mount categorias routes at /categorias
router.use('/v1/categorias', tokenValidation.verificaToken, categoriasRoutes);

// mount estados routes at /estados
router.use('/v1/estados', tokenValidation.verificaToken, estadosRoutes);

// mount profesionales routes at /profesionales
router.use('/v1/profesionales', tokenValidation.verificaToken, profesionalesRoutes);

// mount farmacias routes at /farmacias
router.use('/v1/farmacias', tokenValidation.verificaToken, farmaciasRoutes);

// mount clinicas alta complejidad routes at /clinicasaltacomplejidad
router.use('/v1/clinicasaltacomplejidad', tokenValidation.verificaToken, clinciasaltacomplejidadRoutes);

// mount clinicas routes at /clinicas
router.use('/v1/clinicas', tokenValidation.verificaToken, clinicasRoutes);

// mount domicilios routes at /domicilios
router.use('/v1/domicilios', tokenValidation.verificaToken, domiciliosRoutes);

// mount telefonos routes at /telefonos
router.use('/v1/telefonos', tokenValidation.verificaToken, telefonosRoutes);

// mount ahorarios atenticion routes at /horariosatencion
router.use('/v1/horariosatencion', tokenValidation.verificaToken, horariosatencionRoutes);

module.exports = router;