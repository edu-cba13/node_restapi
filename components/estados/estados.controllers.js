// Requires - importacion de librerias propias o terceros.
const Estados = require('./estados.models');
const config = require('../../config/config').default.dbConfig;
const sqs = require('sequelize-querystring');

const load = async(req, res, next, id) => {
    try {
        req.estados = await Estados.findOne({
            attributes: [
                'id',
                'descripcion'
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
        let resultado = await Estados.findAndCountAll({
            attributes: [
                'id',
                'descripcion'
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
        if (req.estados === null) {
            res.status(400).json({
                message: `Not exist row with id ${req.params.id}`,
                stack: ''
            });
        } else {
            res.json(req.estados);
        }
    } catch (err) {
        next(err);
    }
};

module.exports = { list, get, load };