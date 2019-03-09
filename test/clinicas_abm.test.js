const limit = require('../config/config').default.selectLimit;
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('..');

chai.config.includeStack = true;

const mock = require('./data.mock');

describe('## Clinicas APIs ABM', () => {

    describe('# POST /api-cartilla/v1/clinicas', () => {
        it('should return error role invalid', (done) => {
            request(app)
                .post('/api-cartilla/v1/clinicas')
                .set({ 'api_key': mock.api_key })
                .send({
                    "nombre": "FERRERO",
                    "razon_social": "FERRERO CESAR RICARDO",
                    "cuit": "20316249885",
                    "id_especialidad_clinica": 54,
                    "id_entidad": 5,
                    "id_entidad_hijo": 5,
                    "estado_prestador": true,
                    "estado_ioma": true,
                    "domicilios": [{
                        "id_localidad": 5,
                        "id_partido": 43,
                        "id_barrio": 50,
                        "codigo_postal": 6064,
                        "calle": "3",
                        "altura": "321",
                        "longitud": -58.615115,
                        "latitud": -34.497393,
                        "telefonos": [{
                            "codigo_area": 0,
                            "numero": 388471030,
                            "interno": 2
                        }]
                    }]
                })
                .expect(401)
                .then(() => { done(); })
                .catch(done);
        });
    });

    describe('# PUT /api-cartilla/v1/clinicas/{:id}', () => {
        it('should error id_entidad invalid', (done) => {
            request(app)
                .put('/api-cartilla/v1/clinicas/5261')
                .set({ 'api_key': mock.api_profesionales })
                .send({
                    "id": 5261,
                    "nombre": "FERRERO",
                    "razon_social": "FERRERO CESAR RICARDO",
                    "cuit": "20316249885",
                    "id_especialidad_clinica": 54,
                    "id_entidad": 6,
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

    describe('# PUT /api-cartilla/v1/clinicas/{:id}', () => {
        it('should error cuit invalid', (done) => {
            request(app)
                .put('/api-cartilla/v1/clinicas/5261')
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

    describe('# PUT /api-cartilla/v1/clinicas/{:id}', () => {
        it('should error params id not equal body id', (done) => {
            request(app)
                .put('/api-cartilla/v1/clinicas/190046')
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


    describe('# POST /api-cartilla/v1/clinicas', () => {
        it('should insert clinicas and domicilios', (done) => {
            request(app)
                .post('/api-cartilla/v1/clinicas')
                .set({ 'api_key': mock.api_profesionales })
                .send({
                    "nombre": "FERRERO",
                    "razon_social": "FERRERO CESAR RICARDO",
                    "cuit": "20316249885",
                    "id_especialidad_clinica": 53,
                    "id_entidad": 5,
                    "id_entidad_hijo": 5,
                    "estado_prestador": true,
                    "estado_ioma": true,
                    "domicilios": [{
                        "id_localidad": 5,
                        "id_partido": 43,
                        "id_barrio": 50,
                        "codigo_postal": 6064,
                        "calle": "3",
                        "altura": "321",
                        "longitud": -58.615115,
                        "latitud": -34.497393,
                        "telefonos": [{
                            "codigo_area": 0,
                            "numero": 388471030,
                            "interno": 2
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

    describe('# PUT /api-cartilla/v1/clinicas/{:id}', () => {
        it('should put clinicas and domicilios', (done) => {
            request(app)
                .put('/api-cartilla/v1/clinicas/2609')
                .set({ 'api_key': mock.api_profesionales })
                .send({
                    "id": 2609,
                    "id_especialidad_clinica": 33,
                    "id_entidad": 5,
                    "id_entidad_hijo": 5,
                    "razon_social": "CLÍNICA ESPORA. S.A.",
                    "nombre": "CLÍNICA ESPORA",
                    "cuit": "30563465456",
                    "estado_prestador": true,
                    "estado_ioma": true,
                    "domicilios": [{
                        "id": 91668,
                        "id_localidad": 3,
                        "id_partido": 6,
                        "id_barrio": 50,
                        "id_clinica": 2609,
                        "codigo_postal": 1846,
                        "calle": "ESPORA",
                        "altura": "645",
                        "longitud": -58.38885,
                        "latitud": -34.796519,
                        "telefonos": [{
                            "id": 80763,
                            "id_domicilio": 91668,
                            "codigo_area": 0,
                            "numero": 142931260
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

    describe('# DELETE /api-cartilla/v1/clinicas/{:id}', () => {
        it('should empty', (done) => {
            request(app)
                .delete('/api-cartilla/v1/clinicas/2611')
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