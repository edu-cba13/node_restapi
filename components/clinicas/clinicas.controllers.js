const config = require('../../config/config').default.dbConfig;
const connect = require('../../config/connection_cartilla');
const sqs = require('sequelize-querystring');
const Sequelize = require('sequelize');

const Clinicas = require('./clinicas.models');

const Domicilios = require('../domicilios/domicilios.models');
const methodDomicilios = require('../domicilios/domicilios.controllers');

const Telefonos = require('../telefonos/telefonos.models');
const Horarios = require('../horarios_atencion/horarios_atencion.models');
const Partidos = require('../partidos/partidos.models');
const Localidades = require('../localidades/localidades.models');
const Barrios = require('../barrios/barrios.models');

const Entidades = require('../entidades/entidades.models');

const Especialidades = require('../especialidades_clinicas/especialidades_clinicas.models');

const Log = require('../logs/logs.controllers');

const load = async(req, res, next, id) => {
    try {
        req.rowResult = await Clinicas.findOne({
            where: { id: id },
            include: [{
                    model: Especialidades,
                    as: 'especialidad'
                },
                {
                    model: Entidades,
                    as: 'entidad'
                },
                {
                    model: Entidades,
                    as: 'entidad_hijo'
                },
            ]
        });
        return next();
    } catch (err) {
        next(err);
    }
};

const list = async(req, res, next) => {
    try {
        let limit = req.query.limit || config.limitDefault;
        let offset = req.query.offset || config.offsetDefault;
        let resultado = await Clinicas.findAndCountAll({
            offset: offset,
            limit: limit,
            where: req.query.filter ? sqs.find(req.query.filter) : {},
            //order: req.query.sort ? sqs.sort(req.query.sort) : ['id'],
            include: [{
                    model: Especialidades,
                    as: 'especialidad'
                },
                {
                    model: Entidades,
                    as: 'entidad'
                },
                {
                    model: Entidades,
                    as: 'entidad_hijo'
                },
            ]
        });
        resultado.limit = limit;
        resultado.offset = offset;
        res.json(resultado);
    } catch (err) {
        next(err);
    }
};

const getClinicasAndDomicilios = async(req, res, next) => {
    try {
        let limit = req.query.limit || config.limitDefault;
        let offset = req.query.offset || config.offsetDefault;
        let resultado = await Clinicas.findAndCountAll({
            offset: offset,
            limit: limit,
            where: req.query.filter ? sqs.find(req.query.filter) : {},
            //order: req.query.sort ? sqs.sort(req.query.sort) : ['id'],
            include: [{
                    model: Especialidades,
                    as: 'especialidad'
                },
                {
                    model: Entidades,
                    as: 'entidad'
                },
                {
                    model: Entidades,
                    as: 'entidad_hijo'
                },
                {
                    model: Domicilios,
                    as: 'domicilios',
                    where: req.query.domicilios ? sqs.find(req.query.domicilios) : {},
                    include: [{
                            model: Telefonos,
                            as: 'telefonos',
                        },
                        {
                            model: Horarios,
                            as: 'horarios_atencion',
                        },
                        {
                            model: Partidos,
                            as: 'partido'
                        },
                        {
                            model: Localidades,
                            as: 'localidad'
                        },
                        {
                            model: Barrios,
                            as: 'barrio'
                        },
                    ]
                }
            ]
        });
        resultado.limit = limit;
        resultado.offset = offset;
        res.json(resultado);
    } catch (err) {
        next(err);
    }
};

const get = async(req, res, next) => {
    try {
        if (req.rowResult === null) {
            res.status(400).json({
                message: `Not exist row with id ${req.params.id}`,
                stack: ''
            });
        } else {
            res.json(req.rowResult);
        }
    } catch (err) {
        next(err);
    }
};

const post = async(req, res, next) => {
    try {
        let clinicas = await Clinicas.create(req.body, {
            include: [{
                model: Domicilios,
                as: 'domicilios',
                include: [{
                        model: Telefonos,
                        as: 'telefonos'
                    },
                    {
                        model: Horarios,
                        as: 'horarios_atencion'
                    }
                ]
            }]
        });
        req.message = `Row affected: ${clinicas}`;
        await Log.post(req, { id_usuario: req.user.id, id_object: clinicas.id });
        res.json(clinicas);
    } catch (err) {
        next(err);
    }
};

const put = async(req, res, next) => {
    try {
        if (req.rowResult.count === 0) {
            res.status(400).json({
                message: 'Not row affected',
                stack: ''
            });
        } else {
            await methodDomicilios.setDomicilioTelefonoHorarios(req.body.domicilios)
            let resultado = await Clinicas.update({
                id_especialidad_clinica: req.body.id_especialidad_clinica,
                id_entidad: req.body.id_entidad,
                id_entidad_hijo: req.body.id_entidad_hijo,
                nombre: req.body.nombre,
                razon_social: req.body.razon_social,
                cuit: req.body.cuit,
                estado_prestador: req.body.estado_prestador,
                time_modify: Sequelize.fn("getdate"),
            }, { where: { id: req.params.id } });
            req.message = `Row affected: ${resultado}`;
            await Log.post(req, { id_usuario: req.user.id, id_object: req.body.id });
            res.json(req.body);
        }
    } catch (err) {
        next(err);
    }
}

const deleted = async(req, res, next) => {
    try {
        let resultado = await Clinicas.destroy({
            where: {
                id: req.params.id,
                estado_ioma: true
            }
        });
        req.message = `Row affected: ${resultado}`
        await Log.post(req, { id_usuario: req.user.id, id_object: req.params.id });
        if (resultado === 0) {
            res.status(400).json({
                message: `Not exist row with id ${req.params.id}`,
                stack: ''
            });
        } else {
            res.status(200).json();
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    list,
    get,
    load,
    post,
    put,
    deleted,
    getClinicasAndDomicilios
};