// Requires - importacion de librerias propias o terceros.
const config = require('../../config/config').default.dbConfig;
const sqs = require('sequelize-querystring');
const Sequelize = require('sequelize');
const connect = require('../../config/connection_cartilla');

const Telefonos = require('./telefonos.models');

const Log = require('../logs/logs.controllers');

const load = async(req, res, next, id) => {
    try {
        req.telefonos = await Telefonos.findOne({
            attributes: [
                'id',
                'id_domicilio',
                'codigo_area',
                'numero',
                'interno',
                'time_create',
                'time_modify'
            ],
            where: { id: id }
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
        let resultado = await Telefonos.findAndCountAll({
            attributes: [
                'id',
                'id_domicilio',
                'codigo_area',
                'numero',
                'interno',
                'time_create',
                'time_modify'
            ],
            offset: offset,
            limit: limit,
            where: req.query.filter ? sqs.find(req.query.filter) : {},
            order: req.query.sort ? sqs.sort(req.query.sort) : ['id']
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
        if (req.telefonos === null) {
            res.status(400).json({
                message: `Not exist row with id ${req.params.id}`,
                stack: ''
            });
        } else {
            res.json(req.telefonos);
        }
    } catch (err) {
        next(err);
    }
};

const post = async(req, res, next) => {
    try {
        if (await notMoreThanThreeRows(req.body.id_domicilio)) {
            let telefonos = await Telefonos.create(req.body, {
                model: Telefonos,
                as: 'telefonos'
            });
            req.message = `Row affected: ${telefonos}`;
            await Log.post(req, { id_usuario: req.user.id, id_object: telefonos.id });
            res.json(telefonos);
        } else {
            res.status(400).json({
                message: `You can not exceed three rows.`,
                stack: ''
            });
        }
    } catch (err) {
        next(err);
    }
};

const put = async(req, res, next) => {
    try {
        if (req.telefonos.count === 0) {
            res.status(400).json({
                message: 'Not row affected',
                stack: ''
            });
        } else {
            let telefono = await Telefonos.update({
                id_domicilio: req.body.id_domicilio,
                codigo_area: req.body.codigo_area,
                numero: req.body.numero,
                interno: req.body.interno,
                time_modify: Sequelize.fn("getdate"),
            }, { where: { id: req.body.id } });
            req.message = `Row affected: ${telefono}`;
            await Log.post(req, { id_usuario: req.user.id, id_object: req.params.id });
            res.json(req.body);
        }
    } catch (err) {
        next(err);
    }
}

const notMoreThanThreeRows = async(id_domicilio) => {
    let result = true;
    let resultado = await Telefonos.findAndCountAll({
        where: { id_domicilio: id_domicilio }
    });
    if (resultado.count >= 3) { result = false; }
    return result;
};

const setTelefono = async(telefonos) => {
    if (typeof telefonos !== 'undefined' && telefonos !== null) {
        return await telefonos.map(async tel => {
            await Telefonos.update({
                id_domicilio: tel.id_domicilio,
                codigo_area: tel.codigo_area,
                numero: tel.numero,
                interno: tel.interno,
                time_modify: Sequelize.fn("getdate"),
            }, { where: { id: tel.id } });
        });
    }
};

module.exports = {
    list,
    get,
    load,
    post,
    put,
    setTelefono
};