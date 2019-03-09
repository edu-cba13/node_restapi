// Requires - importacion de librerias propias o terceros.
const config = require('../../config/config').default.dbConfig;
const sqs = require('sequelize-querystring');
const Sequelize = require('sequelize');
const connect = require('../../config/connection_cartilla');

const HorariosAtencion = require('./horarios_atencion.models');

const Log = require('../logs/logs.controllers');

const load = async(req, res, next, id) => {
    try {
        req.horariosatencion = await HorariosAtencion.findOne({
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
        let resultado = await HorariosAtencion.findAndCountAll({
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
        if (req.horariosatencion === null) {
            res.status(400).json({
                message: `Not exist row with id ${req.params.id}`,
                stack: ''
            });
        } else {
            res.json(req.horariosatencion);
        }
    } catch (err) {
        next(err);
    }
};

const post = async(req, res, next) => {
    try {
        if (await notMoreThanSevenRows(req.body.id_domicilio)) {
            let horariosatencion = await HorariosAtencion.create(req.body, {
                model: HorariosAtencion,
                as: 'horarios_atencion'
            });
            await Log.post(req, { id_usuario: req.user.id, id_object: horariosatencion.id });
            res.json(horariosatencion);
        } else {
            res.status(400).json({
                message: `You can not exceed seven rows.`,
                stack: ''
            });
        }
    } catch (err) {
        next(err);
    }
};

const put = async(req, res, next) => {
    try {
        if (req.horariosatencion.count === 0) {
            res.status(400).json({
                message: 'Not row affected',
                stack: ''
            });
        } else {
            let horario = await HorariosAtencion.update({
                id_domicilio: req.body.id_domicilio,
                dia: req.body.dia,
                desde_1: req.body.desde_1,
                hasta_1: req.body.hasta_1,
                desde_2: req.body.desde_2,
                hasta_2: req.body.hasta_2,
                time_modify: Sequelize.fn("getdate"),
            }, { where: { id: req.body.id } });
            req.message = `Row affected: ${horario}`;
            await Log.post(req, { id_usuario: req.user.id, id_object: req.params.id });
            res.json(req.body);
        }
    } catch (err) {
        next(err);
    }
}

const notMoreThanSevenRows = async(id_domicilio) => {
    let result = true;
    let resultado = await HorariosAtencion.findAndCountAll({
        where: { id_domicilio: id_domicilio }
    });
    if (resultado.count >= 7) { result = false; }
    return result;
};

const setHorariosAtencion = async(horarios_atencion) => {
    if (typeof horarios_atencion !== 'undefined' && horarios_atencion !== null) {
        let horario = await horarios_atencion.map(async hor => {
            await HorariosAtencion.update({
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
};

module.exports = { list, get, load, post, put, setHorariosAtencion };