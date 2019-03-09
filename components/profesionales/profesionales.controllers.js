// Requires - importacion de librerias propias o terceros.
const config = require('../../config/config').default.dbConfig;
const connect = require('../../config/connection_cartilla');
const sqs = require('sequelize-querystring');
const Sequelize = require('sequelize');

const validation = require('../../config/generic-validation');

const Joi = require('joi');
const schema = require('../../config/param-validation');

// Array manipulate
const _ = require('lodash');

// File manipulate
const fs = require('fs');
const csv = require('fast-csv');
const { getObjectProfesionales, getJsonProfesionales } = require('../file/profesionales_csv');

const Profesionales = require('./profesionales.models');
const Categorias = require('../categorias/categorias.models');
const Estados = require('../estados/estados.models');

const Domicilios = require('../domicilios/domicilios.models');
const methodDomicilios = require('../domicilios/domicilios.controllers');
const Especialidades = require('../especialidades_profesionales/especialidades_profesionales.models');
const Profesiones = require('../profesiones/profesiones.models');

const Entidades = require('../entidades/entidades.models');
const Telefonos = require('../telefonos/telefonos.models');
const Horarios = require('../horarios_atencion/horarios_atencion.models');
const Partidos = require('../partidos/partidos.models');
const Localidades = require('../localidades/localidades.models');
const Barrios = require('../barrios/barrios.models');

const Log = require('../logs/logs.controllers');

const load = async(req, res, next, id) => {
    try {
        req.rowResult = await Profesionales.findOne({
            where: { id: id },
            include: [{
                    model: Categorias,
                    as: 'categoria'
                },
                {
                    model: Estados,
                    as: 'estado'
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
                    model: Profesiones,
                    as: 'profesion'
                },
                {
                    model: Especialidades,
                    as: 'especialidad'
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
        let resultado = await Profesionales.findAndCountAll({
            offset: offset,
            limit: limit,
            where: req.query.filter ? sqs.find(req.query.filter) : {},
            //order: req.query.sort ? sqs.sort(req.query.sort) : ['id'],
            include: [{
                    model: Categorias,
                    as: 'categoria',
                    where: req.query.categoria ? sqs.find(req.query.categoria) : {}
                },
                {
                    model: Estados,
                    as: 'estado',
                    where: req.query.estado ? sqs.find(req.query.estado) : {}
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
                    model: Profesiones,
                    as: 'profesion',
                    where: req.query.profesion ? sqs.find(req.query.profesion) : {}
                },
                {
                    model: Especialidades,
                    as: 'especialidad',
                    where: req.query.especialidad ? sqs.find(req.query.especialidad) : null,
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
        let profesional = await Profesionales.create(req.body, {
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
        req.message = `Row affected: 1`;
        await Log.post(req, { id_usuario: req.user.id, id_object: profesional.id });
        res.json(profesional);
    } catch (err) {
        const { type, instance } = err.errors[0];
        if (type == "unique violation") {
            res.status(400).json({
                message: `Unique violation - CONSTRAIN id_entidad: ${instance.id_entidad}, id_profesion: ${instance.id_profesion}, id_especialidad: ${instance.id_especialidad}, cuit: ${instance.cuit} must be unique`,
                stack: ''
            });
        } else {
            next(err);
        }
    }
};

const postArray = async(req, res, next) => {
    const t = await connect.transaction();
    try {
        let arrayProfesionales = req.body;

        let partidos = await Partidos.findAll();
        let localidades = await Localidades.findAll();

        console.log(partidos.length);

        if (!Array.isArray(arrayProfesionales)) {
            res.status(400).json({
                message: 'Is not an array',
                stack: ''
            });
        }

        if (arrayProfesionales.length > 15000 && arrayProfesionales.length < 0) {
            res.status(400).json({
                message: 'Array can not be greater than 15000 and less than 1',
                stack: ''
            });
        }

        let deleted = await deletedProfesionalesEntidades(req.params.id_entidad, t);

        for (let key in arrayProfesionales) {
            const { error, value } = Joi.validate(arrayProfesionales[key], schema.profesional);

            if (error) {
                //t.rollback();
                res.status(400).json({
                    message: { Cuit: arrayProfesionales[key].cuit, IndexArray: key, Error: error.details[0].message },
                    stack: ''
                });
            } else if (!validation.cuitValida(arrayProfesionales[key].cuit)) {
                //t.rollback();
                res.status(400).json({
                    message: { Cuit: arrayProfesionales[key].cuit, IndexArray: key, Error: '\"cuit\" format invalid' },
                    stack: ''
                });
            } else if (req.params.id_entidad != arrayProfesionales[key].id_entidad) {
                //t.rollback();
                res.status(400).json({
                    message: { Cuit: arrayProfesionales[key].cuit, IndexArray: key, Error: '\"id_entidad\" not valid' },
                    stack: ''
                });
            }
            /*else {

                           let insert = await Profesionales.create(arrayProfesionales[key], {
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
                       }*/
        }

        let errors;

        for (let data of arrayProfesionales) {
            console.log(_.find(localidades, data.id_localidad));
            if ((!_.find(localidades, data.id_localidad))) {
                errors = "La localida no existe para: " + data.nombre;
            }
            console.log(_.find(partidos, data.id_partido));
            if ((!_.find(partidos, data.id_partido))) {
                errors = "El partido no existe para: " + data.nombre;
            }

            await Profesionales.create(data, {
                include: [{
                    model: Domicilios,
                    as: 'domicilios',
                    transaction: t,
                    include: [{
                            model: Telefonos,
                            as: 'telefonos',
                            transaction: t
                        },
                        {
                            model: Horarios,
                            as: 'horarios_atencion',
                            transaction: t
                        }
                    ]
                }],
                transaction: t
            }).catch(err => {
                //errors = err.message + '-' + err.sql;
            });
        };


        /* Profesionales.bulkCreate(arrayProfesionales, {
             individualHooks: true,
             transaction: t
         }).then(data => {
             console.log(Object.keys(data));
             

         }).catch(err => {
             t.rollback();
             res.status(400).json({
                 message: err,
                 stack: ''
             });
         });*/



        /*let profesionalesIds = await Profesionales.bulkCreate(arrayProfesionales, {
            individualHooks: true,
            transaction: t
        });

        let domiciliosArray = [];
        profesionalesIds.map(async(data, index) => {
            let profesional = arrayProfesionales[index];

            let domicilios = profesional.domicilios.map(dom => {
                dom.id_profesional = data.dataValues.id;
                return dom;
            });

            domiciliosArray = _.concat(domiciliosArray, domicilios);
        });

        let domiciliosIds = await Domicilios.bulkCreate(domiciliosArray, {
            individualHooks: true,
            transaction: t
        }).catch(err => {
            t.rollback();
            res.status(400).json({
                message: (err.parent).sql + '-' + (err.parent).message,
                stack: ''
            });
        });

        let domiciliosArray = [];
        domiciliosIds.map(async(data, index) => {
            let profesional = arrayProfesionales[index];

            let domicilios = profesional.domicilios.map(dom => {
                dom.id_profesional = data.dataValues.id;
                return dom;
            });

            domiciliosArray = _.concat(domiciliosArray, domicilios);
        });
        //console.log(domiciliosIds);

        /* domiciliosArray.map(domicilio, index => {

             let telefonos = domicilios[index].telefonos;
             console.log(telefonos);
             if (telefonos.length != 0) {
                 let telefonosArray = telefonos.map(telefono => {
                     telefono.id_domicilio = domicilio.dataValues.id;
                     return telefono;
                 });

                 Telefonos.bulkCreate(telefonosArray, {
                     individualHooks: true,
                     transaction: t
                 });
             }

             /* if (domicilios.horarios_atencion && domicilios.horarios_atencion.length != 0) {
                  let horariosArray = domicilio.horarios_atencion.map(horario => {
                      horario.id_domicilio = data.dataValues.id;
                      return horario;
                  });

                  Horarios.bulkCreate(horariosArray, {
                      individualHooks: true,
                      transaction: t
                  });
              }*/
        // });


        //console.log(domiciliosArray);
        if (errors) {
            //t.rollback();
            res.status(400).json({
                message: errors,
                stack: ''
            });
        } else {
            req.message = `RowInsert: ${arrayProfesionales.length}, RowDeleted: ${deleted}`;
            await Log.post(req, { id_usuario: req.user.id, id_object: req.params.id_entidad }, t);

            t.commit();
            res.status(200).json({
                message: `RowInsert: ${arrayProfesionales.length}, RowDeleted: ${deleted}`,
                stack: ''
            });
        }


    } catch (err) {
        //t.rollback();
        const { type, instance } = err.errors[0];
        if (type == "unique violation") {
            res.status(400).json({
                message: `Unique violation - CONSTRAIN id_entidad: ${instance.id_entidad}, id_profesion: ${instance.id_profesion}, id_especialidad: ${instance.id_especialidad}, cuit: ${instance.cuit} must be unique`,
                stack: ''
            });
        } else {
            next(err);
        }
    }
};


const postCsv = async(req, res, next) => {
    try {
        let file = req.file.path;
        let array = [];
        let stream = fs.createReadStream(file);

        csv
            .fromStream(stream, { headers: false, delimiter: ";", trim: true })
            .on("data", function(data) {
                array.push(getObjectProfesionales(data));
            })
            .on("end", function() {

                let profesionales = _.sortBy(array, ['id_especialidad', 'id_profesion', 'id_entidad', 'cuit', 'matricula_provincial']);

                // Quit header the array
                profesionales.pop();

                let resultArray = getJsonProfesionales(profesionales);

                fs.unlinkSync(file);

                res.json(resultArray);
            });
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
            let domicilio = await methodDomicilios.setDomicilioTelefonoHorarios(req.body.domicilios)
            let resultado = await Profesionales.update({
                id_estado: req.body.id_estado,
                id_categoria: req.body.id_categoria,
                id_profesion: req.body.id_profesion,
                id_especialidad: req.body.id_especialidad,
                id_entidad: req.body.id_entidad,
                id_entidad_hijo: req.body.id_entidad_hijo,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                cuit: req.body.cuit,
                matricula_provincial: req.body.matricula_provincial,
                matricula_nacional: req.body.matricula_nacional,
                time_modify: Sequelize.fn("getdate"),
            }, { where: { id: req.params.id } });
            req.message = `Row affected: ${resultado}`;
            await Log.post(req, { id_usuario: req.user.id, id_object: req.params.id });
            res.json(req.body);
        }
    } catch (err) {
        next(err);
    }
}

const deleted = async(req, res, next) => {
    try {
        let resultado = await Profesionales.destroy({
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

const getProfesionalesAndDomicilios = async(req, res, next) => {
    try {
        let limit = req.query.limit || config.limitDefault;
        let offset = req.query.offset || config.offsetDefault;
        let resultado = await Profesionales.findAndCountAll({
            offset: offset,
            limit: limit,
            where: req.query.filter ? sqs.find(req.query.filter) : {},
            //order: req.query.sort ? sqs.sort(req.query.sort) : ['id'],
            include: [{
                    model: Categorias,
                    as: 'categoria',
                    where: req.query.categoria ? sqs.find(req.query.categoria) : {}
                },
                {
                    model: Estados,
                    as: 'estado',
                    where: req.query.estado ? sqs.find(req.query.estado) : {}
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
                    model: Profesiones,
                    as: 'profesion',
                    where: req.query.profesion ? sqs.find(req.query.profesion) : {}
                },
                {
                    model: Especialidades,
                    as: 'especialidad',
                    where: req.query.especialidad ? sqs.find(req.query.especialidad) : null,
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

const insertProfesional = async(profesional, transaction) => {
    let query = {
        include: [{
            model: Domicilios,
            as: 'domicilios',
            transaction: transaction,
            include: [{
                    model: Telefonos,
                    as: 'telefonos',
                    transaction: transaction
                },
                {
                    model: Horarios,
                    as: 'horarios_atencion',
                    transaction: transaction
                }
            ]
        }]
    };
    if (transaction) {
        query.transaction = transaction;
        return Profesionales.create(profesional, query);
    } else {
        return Profesionales.create(profesional);
    }
};


const deletedProfesionalesEntidades = async(id_entidad, transaction) => {
    return await Profesionales.destroy({
        where: {
            id_entidad: id_entidad,
            estado_ioma: true
        },
        transaction: transaction
    });
};

module.exports = {
    list,
    get,
    load,
    post,
    postArray,
    postCsv,
    put,
    deleted,
    getProfesionalesAndDomicilios
};