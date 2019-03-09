const config = require('../../config/config').default.dbConfig;
const connect = require('../../config/connection_cartilla');
const sqs = require('sequelize-querystring');
const Sequelize = require('sequelize');

const Domicilios = require('./domicilios.models');
const Telefonos = require('../telefonos/telefonos.models');
const Horarios = require('../horarios_atencion/horarios_atencion.models');
const Partidos = require('../partidos/partidos.models');
const Localidades = require('../localidades/localidades.models');
const Barrios = require('../barrios/barrios.models');

const Log = require('../logs/logs.controllers');
const telefonosController = require('../telefonos/telefonos.controllers');
const horariosController = require('../horarios_atencion/horarios_atencion.controllers');

const load = async(req, res, next, id) => {
    try {
        req.rowResult = await Domicilios.findOne({
            where: { id: id },
            include: [{
                    model: Telefonos,
                    as: 'telefonos'
                },
                {
                    model: Horarios,
                    as: 'horarios_atencion'
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
        let resultado = await Domicilios.findAndCountAll({
            offset: offset,
            limit: limit,
            where: req.query.filter ? sqs.find(req.query.filter) : {},
            //order: req.query.sort ? sqs.sort(req.query.sort) : ['id'],
            include: [{
                    model: Telefonos,
                    as: 'telefonos'
                },
                {
                    model: Horarios,
                    as: 'horarios_atencion'
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
        let domicilio = await Domicilios.create(req.body, {
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
        });
        req.message = `Row affected: ${domicilio}`;
        await Log.post(req, { id_usuario: req.user.id, id_object: domicilio.id });
        res.json(domicilio);
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
            let domicilio = await Domicilios.update({
                id_localidad: req.body.id_localidad,
                id_partido: req.body.id_partido,
                id_barrio: req.body.id_barrio,
                id_profesional: req.body.id_profesional,
                id_farmacia: req.body.id_farmacia,
                id_clinica: req.body.id_clinica,
                id_clinica_alta_complejidad: req.body.id_clinica_alta_complejidad,
                codigo_postal: req.body.codigo_postal,
                calle: req.body.calle,
                altura: req.body.altura,
                piso: req.body.piso,
                departamento: req.body.departamento,
                longitud: req.body.longitud,
                latitud: req.body.latitud,
                time_modify: Sequelize.fn("getdate"),
            }, { where: { id: req.params.id } });
            await telefonosController.setTelefono(req.body.telefonos);
            await horariosController.setHorariosAtencion(req.body.horarios_atencion);
            req.message = `Row affected: ${domicilio}`
            await Log.post(req, { id_usuario: req.user.id, id_object: req.params.id });
            res.status(200).json(req.body);
        }
    } catch (err) {
        next(err);
    }
}

const deleted = async(req, res, next) => {
    try {
        let resultado = await Domicilios.destroy({
            where: {
                id: req.params.id
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

const setDomicilioTelefonoHorarios = async(domicilios) => {
    if (typeof domicilios !== 'undefined' && domicilios !== null) {
        let domicilio = await domicilios.map(async dom => {
            await Domicilios.update({
                id_localidad: dom.id_localidad,
                id_partido: dom.id_partido,
                id_barrio: dom.id_barrio,
                id_profesional: dom.id_profesional,
                id_farmacia: dom.id_farmacia,
                id_clinica: dom.id_clinica,
                id_clinica_alta_complejidad: dom.id_clinica_alta_complejidad,
                codigo_postal: dom.codigo_postal,
                calle: dom.calle,
                altura: dom.altura,
                piso: dom.piso,
                departamento: dom.departamento,
                longitud: dom.longitud,
                latitud: dom.latitud,
                time_modify: Sequelize.fn("getdate"),
            }, { where: { id: dom.id } });

            if (typeof dom.telefonos !== 'undefined' && dom.telefonos !== null) {
                await dom.telefonos.map(async tel => {
                    await Telefonos.update({
                        id_domicilio: tel.id_domicilio,
                        codigo_area: tel.codigo_area,
                        numero: tel.numero,
                        interno: tel.interno,
                        time_modify: Sequelize.fn("getdate"),
                    }, { where: { id: tel.id } });
                });
            }

            if (typeof dom.horarios_atencion !== 'undefined' && dom.horarios_atencion !== null) {
                await dom.horarios_atencion.map(async hor => {
                    await Horarios.update({
                        id_domicilio: hor.id_domicilio,
                        dia: hor.dia,
                        desde_1: hor.desde_1,
                        hasta_1: hor.hasta_1,
                        desde_2: hor.desde_2,
                        hasta_2: hor.hasta_2,
                        time_modify: Sequelize.fn("getdate"),
                    }, { where: { id: hor.id } });
                });
            }
        });
    }
};

module.exports = {
    list,
    get,
    load,
    post,
    put,
    deleted,
    setDomicilioTelefonoHorarios
};