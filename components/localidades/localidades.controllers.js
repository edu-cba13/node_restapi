// Requires - importacion de librerias propias o terceros.
const config = require('../../config/config').default.dbConfig;
const sqs = require('sequelize-querystring');

const Localidades = require('./localidades.models');
const Barrios = require('../barrios/barrios.models');

const load = async(req, res, next, id) => {
    try {
        req.localidades = await Localidades.findOne({
            attributes: [
                'id',
                'id_partido',
                'descripcion',
                'codigo_postal'
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
        let resultado = await Localidades.findAndCountAll({
            attributes: [
                'id',
                'id_partido',
                'descripcion',
                'codigo_postal'
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
        if (req.localidades === null) {
            res.status(400).json({
                message: `Not exist row with id ${req.params.id}`,
                stack: ''
            });
        } else {
            res.json(req.localidades);
        }
    } catch (err) {
        next(err);
    }
};

const getLocalidadesAndBarrios = async(req, res, next) => {
    try {
        let limit = req.query.limit || config.limitDefault;
        let offset = req.query.offset || config.offsetDefault;
        let resultado = await Localidades.findAndCountAll({
            attributes: [
                'id',
                'id_partido',
                'descripcion',
                'codigo_postal'
            ],
            offset: offset,
            limit: limit,
            where: req.query.filter ? sqs.find(req.query.filter) : {},
            order: req.query.sort ? sqs.sort(req.query.sort) : ['id'],
            include: [{
                model: Barrios,
                as: 'barrios',
                where: req.query.barrios ? sqs.find(req.query.barrios) : {}
            }]
        });
        resultado.limit = limit;
        resultado.offset = offset;
        res.json(resultado);
    } catch (err) {
        next(err);
    }
};

const exits = (id_localidad) => {
    Localidades.findOne({
            where: { id: id_localidad }
        }).then(true)
        .catch(err => {
            next(err);
        });
};

module.exports = {
    exits,
    list,
    get,
    load,
    getLocalidadesAndBarrios
};