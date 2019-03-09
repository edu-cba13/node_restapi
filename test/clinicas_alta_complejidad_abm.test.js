const limit = require('../config/config').default.selectLimit;
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('..');

chai.config.includeStack = true;

const mock = require('./data.mock');

describe('## Clinicas alta complejidad APIs ABM', () => {

    describe('# POST /api-cartilla/v1/clinicasaltacomplejidad', () => {
        it('should return error role invalid', (done) => {
            request(app)
                .post('/api-cartilla/v1/clinicasaltacomplejidad')
                .set({ 'api_key': mock.api_key })
                .send({
                    "id_especialidad_clinica_alta_complejidad": 2,
                    "id_entidad": 5,
                    "id_entidad_hijo": 5,
                    "nombre": "DIAGNOSTICO POR IMAGENES ADROGUE ",
                    "razon_social": "CENTRO DE TOMOGRAFIA COMPUTADA S.A. ",
                    "cuit": "33610954699",
                    "estado_prestador": true,
                    "estado_ioma": true,
                    "domicilios": [{
                        "id_localidad": 3,
                        "id_partido": 6,
                        "id_barrio": 50,
                        "id_clinica_alta_complejidad": 1154,
                        "codigo_postal": 1846,
                        "calle": "BYNNON",
                        "altura": "3",
                        "longitud": -58.388,
                        "latitud": -34.797042,
                        "telefonos": [{
                            "codigo_area": 0,
                            "numero": 214641136
                        }]
                    }]
                })
                .expect(401)
                .then(() => { done(); })
                .catch(done);
        });
    });

    describe('# PUT /api-cartilla/v1/clinicasaltacomplejidad/{:id}', () => {
        it('should error id_entidad invalid', (done) => {
            request(app)
                .put('/api-cartilla/v1/clinicasaltacomplejidad/1447')
                .set({ 'api_key': mock.api_profesionales })
                .send({
                    "id": 1447,
                    "id_especialidad_clinica_alta_complejidad": 2,
                    "id_entidad": 6,
                    "id_entidad_hijo": 5,
                    "nombre": "DIAGNOSTICO POR IMAGENES ADROGUE ",
                    "razon_social": "CENTRO DE TOMOGRAFIA COMPUTADA S.A. ",
                    "cuit": "33610954699",
                    "estado_prestador": true,
                    "estado_ioma": true,
                    "domicilios": [{
                        "id": 91929,
                        "id_localidad": 3,
                        "id_partido": 6,
                        "id_barrio": 50,
                        "id_clinica_alta_complejidad": 1447,
                        "codigo_postal": 1846,
                        "calle": "BYNNON",
                        "altura": "3",
                        "longitud": -58.388,
                        "latitud": -34.797042,
                        "telefonos": [{
                            "id": 81102,
                            "codigo_area": 0,
                            "numero": 214641136,
                            "id_domicilio": 91929
                        }]
                    }]
                })
                .expect(401)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message').to.be.a('string');
                    expect(res.body).to.have.property('stack');
                    done();
                })
                .catch(done);
        });
    });

    describe('# PUT /api-cartilla/v1/clinicasaltacomplejidad/{:id}', () => {
        it('should error cuit invalid', (done) => {
            request(app)
                .put('/api-cartilla/v1/clinicasaltacomplejidad/5261')
                .set({ 'api_key': mock.api_profesionales })
                .send({
                    "id": 5261,
                    "nombre": "FERRERO",
                    "razon_social": "FERRERO CESAR RICARDO",
                    "cuit": "203162498853",
                    "id_entidad": 5,
                    "id_entidad_hijo": 5,
                    "estado_prestador": true,
                    "estado_ioma": true,
                    "domicilios": [{
                        "id": 91893,
                        "id_localidad": 5,
                        "id_partido": 43,
                        "id_barrio": 50,
                        "codigo_postal": 6064,
                        "calle": "3",
                        "altura": "321",
                        "longitud": -58.615115,
                        "latitud": -34.497393,
                        "telefonos": [{
                            "id": 81066,
                            "codigo_area": 0,
                            "numero": 388471030,
                            "interno": 2,
                            "id_domicilio": 91893
                        }],
                        "id_farmacia": 5261
                    }]
                })
                .expect(400)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message').to.be.a('string');
                    expect(res.body).to.have.property('stack');
                    done();
                })
                .catch(done);
        });
    });

    describe('# PUT /api-cartilla/v1/clinicasaltacomplejidad/{:id}', () => {
        it('should error params id not equal body id', (done) => {
            request(app)
                .put('/api-cartilla/v1/clinicasaltacomplejidad/190046')
                .set({ 'api_key': mock.api_profesionales })
                .send({
                    "id": 5261,
                    "nombre": "FERRERO",
                    "razon_social": "FERRERO CESAR RICARDO",
                    "cuit": "20316249885",
                    "id_entidad": 5,
                    "id_entidad_hijo": 5,
                    "estado_prestador": true,
                    "estado_ioma": true,
                    "domicilios": [{
                        "id": 91893,
                        "id_localidad": 5,
                        "id_partido": 43,
                        "id_barrio": 50,
                        "codigo_postal": 6064,
                        "calle": "3",
                        "altura": "321",
                        "longitud": -58.615115,
                        "latitud": -34.497393,
                        "telefonos": [{
                            "id": 81066,
                            "codigo_area": 0,
                            "numero": 388471030,
                            "interno": 2,
                            "id_domicilio": 91893
                        }],
                        "id_farmacia": 5261
                    }]
                })
                .expect(400)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message').to.be.a('string');
                    expect(res.body).to.have.property('stack');
                    done();
                })
                .catch(done);
        });
    });


    describe('# POST /api-cartilla/v1/clinicasaltacomplejidad', () => {
        it('should insert clinicas alta complejidad and domicilios', (done) => {
            request(app)
                .post('/api-cartilla/v1/clinicasaltacomplejidad')
                .set({ 'api_key': mock.api_profesionales })
                .send({
                    "id_especialidad_clinica_alta_complejidad": 2,
                    "id_entidad": 5,
                    "id_entidad_hijo": 5,
                    "nombre": "DIAGNOSTICO POR IMAGENES ADROGUE ",
                    "razon_social": "CENTRO DE TOMOGRAFIA COMPUTADA S.A. ",
                    "cuit": "33610954699",
                    "estado_prestador": true,
                    "estado_ioma": true,
                    "domicilios": [{
                        "id_localidad": 3,
                        "id_partido": 6,
                        "id_barrio": 50,
                        "id_clinica_alta_complejidad": 1154,
                        "codigo_postal": 1846,
                        "calle": "BYNNON",
                        "altura": "3",
                        "longitud": -58.388,
                        "latitud": -34.797042,
                        "telefonos": [{
                            "codigo_area": 0,
                            "numero": 214641136
                        }]
                    }]
                })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id').to.be.a('number');
                    expect(res.body).to.have.property('id_entidad').to.be.a('number');
                    expect(res.body).to.have.property('id_entidad_hijo');
                    expect(res.body).to.have.property('nombre').to.be.a('string');
                    expect(res.body).to.have.property('razon_social').to.be.a('string');
                    expect(res.body).to.have.property('cuit').to.be.a('string');
                    expect(res.body).to.have.property('estado_ioma').to.be.a('boolean');
                    expect(res.body).to.have.property('domicilios').to.be.a('array');
                    done();
                })
                .catch(done);
        });
    });

    describe('# PUT /api-cartilla/v1/clinicasaltacomplejidad/{:id}', () => {
        it('should put clinicas alta complejidad and domicilios', (done) => {
            request(app)
                .put('/api-cartilla/v1/clinicasaltacomplejidad/1449')
                .set({ 'api_key': mock.api_profesionales })
                .send({
                    "id": 1449,
                    "id_especialidad_clinica_alta_complejidad": 2,
                    "id_entidad": 5,
                    "id_entidad_hijo": 5,
                    "nombre": "DIAGNOSTICO POR IMAGENES ADROGUE ",
                    "razon_social": "CENTRO DE TOMOGRAFIA COMPUTADA S.A. ",
                    "cuit": "33610954699",
                    "estado_prestador": true,
                    "estado_ioma": true,
                    "domicilios": [{
                        "id": 91931,
                        "id_localidad": 3,
                        "id_partido": 6,
                        "id_barrio": 50,
                        "id_clinica_alta_complejidad": 1449,
                        "codigo_postal": 1846,
                        "calle": "BYNNON",
                        "altura": "3",
                        "longitud": -58.388,
                        "latitud": -34.797042,
                        "telefonos": [{
                            "id": 81104,
                            "id_domicilio": 91931,
                            "codigo_area": 0,
                            "numero": 214641136
                        }]
                    }]
                })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id').to.be.a('number');
                    expect(res.body).to.have.property('id_entidad').to.be.a('number');
                    expect(res.body).to.have.property('id_entidad_hijo');
                    expect(res.body).to.have.property('nombre').to.be.a('string');
                    expect(res.body).to.have.property('razon_social').to.be.a('string');
                    expect(res.body).to.have.property('cuit').to.be.a('string');
                    expect(res.body).to.have.property('estado_ioma').to.be.a('boolean');
                    expect(res.body).to.have.property('domicilios').to.be.a('array');
                    done();
                })
                .catch(done);
        });
    });

    describe('# DELETE /api-cartilla/v1/clinicasaltacomplejidad/{:id}', () => {
        it('should empty', (done) => {
            request(app)
                .delete('/api-cartilla/v1/clinicasaltacomplejidad/1150')
                .set({ 'api_key': mock.api_profesionales })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body);
                    done();
                })
                .catch(done);
        });
    });
});