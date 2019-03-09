// Requires - importacion de librerias propias o terceros.
const EspeciliadadClinica = require('./especialidades_clinicas.models');
const config = require('../../config/config').default.dbConfig;
const sqs = require('sequelize-querystring');


const load = async(req, res, next, id) => {
    try {
        req.especiliadadclinica = await EspeciliadadClinica.findOne({
            attributes: ['id', 'descripcion', 'codigo'],
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
        let resultado = await EspeciliadadClinica.findAndCountAll({
            attributes: ['id', 'descripcion', 'codigo'],
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
        if (req.especiliadadclinica === null) {
            res.status(400).json({
                message: `Not exist row with id ${req.params.id}`,
                stack: ''
            });
        } else {
            res.json(req.especiliadadclinica);
        }
    } catch (err) {
        next(err);
    }
};

module.exports = { list, get, load };