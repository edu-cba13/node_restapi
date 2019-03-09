const limit = require('../config/config').default.selectLimit;
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('..');

chai.config.includeStack = true;

const mock = require('./data.mock');

describe('## Farmacias APIs ABM', () => {

    describe('# POST /api-cartilla/v1/farmacias', () => {
        it('should return error role invalid', (done) => {
            request(app)
                .post('/api-cartilla/v1/farmacias')
                .set({ 'api_key': mock.api_key })
                .send({
                    "nombre": "FERRERO",
                    "razon_social": "FERRERO CESAR RICARDO",
                    "cuit": "20316249885",
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
                            "interno": 2,
                            "id_domicilio": 91892
                        }]
                    }]
                })
                .expect(401)
                .then(() => { done(); })
                .catch(done);
        });
    });

    describe('# PUT /api-cartilla/v1/farmacias/{:id}', () => {
        it('should error id_entidad invalid', (done) => {
            request(app)
                .put('/api-cartilla/v1/farmacias/190046')
                .set({ 'api_key': mock.api_profesionales })
                .send({
                    "id": 190046,
                    "id_estado": 1,
                    "id_categoria": 1,
                    "id_profesion": 7,
                    "id_especialidad": 133,
                    "id_entidad": 7,
                    "id_entidad_hijo": 5,
                    "nombre": "pepe",
                    "apellido": "pirulo",
                    "cuit": "20316249885",
                    "matricula_provincial": 123456798,
                    "matricula_nacional": 13245645,
                    "estado_ioma": true,
                    "domicilios": [{
                        "id": 91869,
                        "id_entidad": 2,
                        "id_localidad": 2,
                        "id_partido": 2,
                        "id_barrio": 50,
                        "id_profesional": 190046,
                        "codigo_postal": 1900,
                        "calle": "Falsa",
                        "altura": "123",
                        "piso": 3,
                        "departamento": "B",
                        "longitud": 1.23,
                        "latitud": -32.645,
                        "telefonos": [{
                                "id": 81028,
                                "id_domicilio": 91869,
                                "codigo_area": 221,
                                "numero": 12345678,
                                "interno": 2
                            },
                            {
                                "id": 81029,
                                "id_domicilio": 91869,
                                "codigo_area": 221,
                                "numero": 12345678,
                                "interno": 2
                            }
                        ],
                        "horarios_atencion": [{
                            "id": 1134,
                            "id_domicilio": 91869,
                            "dia": "Lunes",
                            "desde_1": "09:00",
                            "hasta_1": "12:00",
                            "desde_2": "14:00",
                            "hasta_2": "19:00"
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

    describe('# PUT /api-cartilla/v1/farmacias/{:id}', () => {
        it('should error cuit invalid', (done) => {
            request(app)
                .put('/api-cartilla/v1/farmacias/5261')
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

    describe('# PUT /api-cartilla/v1/farmacias/{:id}', () => {
        it('should error params id not equal body id', (done) => {
            request(app)
                .put('/api-cartilla/v1/farmacias/190046')
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


    describe('# POST /api-cartilla/v1/farmacias', () => {
        it('should insert profesional and domicilios', (done) => {
            request(app)
                .post('/api-cartilla/v1/farmacias')
                .set({ 'api_key': mock.api_profesionales })
                .send({
                    "nombre": "FERRERO",
                    "razon_social": "FERRERO CESAR RICARDO",
                    "cuit": "20316249885",
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
                            "interno": 2,
                            "id_domicilio": 91893
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

    describe('# PUT /api-cartilla/v1/farmacias/{:id}', () => {
        it('should put farmacias and domicilios', (done) => {
            request(app)
                .put('/api-cartilla/v1/farmacias/5261')
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

    describe('# DELETE /api-cartilla/v1/farmacias/{:id}', () => {
        it('should empty', (done) => {
            request(app)
                .delete('/api-cartilla/v1/farmacias/5258')
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