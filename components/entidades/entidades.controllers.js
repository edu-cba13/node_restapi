// Requires - importacion de librerias propias o terceros.
const Entidades = require('./entidades.models');
const config = require('../../config/config').default.dbConfig;
const sqs = require('sequelize-querystring');

const Domicilios = require('../domicilios/domicilios.models');

const load = async(req, res, next, id) => {
    try {
        req.entidades = await Entidades.findOne({
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
        let resultado = await Entidades.findAndCountAll({
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
        if (req.entidades === null) {
            res.status(400).json({
                message: `Not exist row with id ${req.params.id}`,
                stack: ''
            });
        } else {
            res.json(req.entidades);
        }
    } catch (err) {
        next(err);
    }
};

module.exports = { list, get, load };