// Requires - importacion de librerias propias o terceros.
const config = require('../../config/config').default.dbConfig;
const sqs = require('sequelize-querystring');

const Partidos = require('./partidos.models');
const Localidades = require('../localidades/localidades.models');
const Barrios = require('../barrios/barrios.models');

const load = async(req, res, next, id) => {
    try {
        req.partidos = await Partidos.findOne({
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
        let resultado = await Partidos.findAndCountAll({
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

const getPartidosAndLocalidades = async(req, res, next) => {
    try {
        let limit = req.query.limit || config.limitDefault;
        let offset = req.query.offset || config.offsetDefault;
        let resultado = await Partidos.findAndCountAll({
            attributes: [
                'id',
                'descripcion'
            ],
            offset: offset,
            limit: limit,
            where: req.query.filter ? sqs.find(req.query.filter) : {},
            order: req.query.sort ? sqs.sort(req.query.sort) : ['id'],
            include: [
                { model: Localidades, as: 'localidades' }
            ]
        });
        resultado.limit = limit;
        resultado.offset = offset;
        res.json(resultado);
    } catch (err) {
        next(err);
    }
};


const getPartidosAndLocalidadesAndBarrios = async(req, res, next) => {
    try {
        let limit = req.query.limit || config.limitDefault;
        let offset = req.query.offset || config.offsetDefault;
        let resultado = await Partidos.findAndCountAll({
            attributes: [
                'id',
                'descripcion'
            ],
            offset: offset,
            limit: limit,
            where: req.query.filter ? sqs.find(req.query.filter) : {},
            order: req.query.sort ? sqs.sort(req.query.sort) : ['id'],
            include: [{
                model: Localidades,
                as: 'localidades',
                include: [{ model: Barrios, as: 'barrios' }]
            }]
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
        if (req.partidos === null) {
            res.status(400).json({
                message: `Not exist row with id ${req.params.id}`,
                stack: ''
            });
        } else {
            res.json(req.partidos);
        }
    } catch (err) {
        next(err);
    }
};


const exits = (id_partido) => {
    Partidos.findOne({
            where: { id: id_partido }
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
    getPartidosAndLocalidades,
    getPartidosAndLocalidadesAndBarrios
}