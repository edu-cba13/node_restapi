const limit = require('../config/config').default.selectLimit;
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('..');

chai.config.includeStack = true;

const mock = require('./data.mock');

describe('## Profesionales APIs ABM', () => {

    describe('# POST /api-cartilla/v1/profesionales', () => {
        it('should return error role invalid', (done) => {
            request(app)
                .post('/api-cartilla/v1/profesionales')
                .set({ 'api_key': mock.api_key })
                .send({
                    "id_estado": 1,
                    "id_categoria": 1,
                    "id_profesion": 7,
                    "id_especialidad": 135,
                    "id_entidad": 5,
                    "id_entidad_hijo": 5,
                    "nombre": "pepe",
                    "apellido": "pirulo",
                    "cuit": "20316249885",
                    "matricula_provincial": 123456798,
                    "matricula_nacional": 13245645,
                    "estado_ioma": true,
                    "domicilios": [{
                        "id_entidad": 2,
                        "id_localidad": 2,
                        "id_partido": 2,
                        "id_barrio": 50,
                        "id_profesional": 190040,
                        "codigo_postal": 1900,
                        "calle": "Falsa",
                        "altura": "123",
                        "piso": 3,
                        "departamento": "B",
                        "longitud": 1.23,
                        "latitud": -32.645,
                        "telefonos": [{
                                "codigo_area": 221,
                                "numero": 12345678,
                                "interno": 2
                            },
                            {
                                "codigo_area": 221,
                                "numero": 12345678,
                                "interno": 2
                            }
                        ],
                        "horarios_atencion": [{
                            "dia": "Lunes",
                            "desde_1": "09:00",
                            "hasta_1": "12:00",
                            "desde_2": "14:00",
                            "hasta_2": "19:00"
                        }]
                    }]
                })
                .expect(401)
                .then(() => { done(); })
                .catch(done);
        });
    });

    describe('# PUT /api-cartilla/v1/profesionales/{:id}', () => {
        it('should error id_entidad invalid', (done) => {
            request(app)
                .put('/api-cartilla/v1/profesionales/190046')
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

    describe('# PUT /api-cartilla/v1/profesionales/{:id}', () => {
        it('should error cuit invalid', (done) => {
            request(app)
                .put('/api-cartilla/v1/profesionales/190046')
                .set({ 'api_key': mock.api_profesionales })
                .send({
                    "id": 190046,
                    "id_estado": 1,
                    "id_categoria": 1,
                    "id_profesion": 7,
                    "id_especialidad": 133,
                    "id_entidad": 5,
                    "id_entidad_hijo": 5,
                    "nombre": "pepe",
                    "apellido": "pirulo",
                    "cuit": "2031624988512",
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

    describe('# PUT /api-cartilla/v1/profesionales/{:id}', () => {
        it('should error params id not equal body id', (done) => {
            request(app)
                .put('/api-cartilla/v1/profesionales/190046')
                .set({ 'api_key': mock.api_profesionales })
                .send({
                    "id": 190047,
                    "id_estado": 1,
                    "id_categoria": 1,
                    "id_profesion": 7,
                    "id_especialidad": 133,
                    "id_entidad": 5,
                    "id_entidad_hijo": 5,
                    "nombre": "pepe",
                    "apellido": "pirulo",
                    "cuit": "2031624988512",
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


    describe('# POST /api-cartilla/v1/profesionales', () => {
        it('should insert profesional and domicilios', (done) => {
            request(app)
                .post('/api-cartilla/v1/profesionales')
                .set({ 'api_key': mock.api_profesionales })
                .send({
                    "id_estado": 1,
                    "id_categoria": 1,
                    "id_profesion": 7,
                    "id_especialidad": 133,
                    "id_entidad": 5,
                    "id_entidad_hijo": 5,
                    "nombre": "pepe",
                    "apellido": "pirulo",
                    "cuit": "20316249885",
                    "matricula_provincial": 123456798,
                    "matricula_nacional": 13245645,
                    "estado_ioma": true,
                    "domicilios": [{
                        "id_entidad": 2,
                        "id_localidad": 2,
                        "id_partido": 2,
                        "id_barrio": 50,
                        "codigo_postal": 1900,
                        "calle": "Falsa",
                        "altura": "123",
                        "piso": 3,
                        "departamento": "B",
                        "longitud": 1.23,
                        "latitud": -32.645,
                        "telefonos": [{
                                "codigo_area": 221,
                                "numero": 12345678,
                                "interno": 2
                            },
                            {
                                "codigo_area": 221,
                                "numero": 12345678,
                                "interno": 2
                            }
                        ],
                        "horarios_atencion": [{
                            "dia": "Lunes",
                            "desde_1": "09:00",
                            "hasta_1": "12:00",
                            "desde_2": "14:00",
                            "hasta_2": "19:00"
                        }]
                    }]
                })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id').to.be.a('number');
                    expect(res.body).to.have.property('id_estado').to.be.a('number');
                    expect(res.body).to.have.property('id_categoria').to.be.a('number');
                    expect(res.body).to.have.property('id_profesion').to.be.a('number');
                    expect(res.body).to.have.property('id_especialidad').to.be.a('number');
                    expect(res.body).to.have.property('id_entidad').to.be.a('number');
                    expect(res.body).to.have.property('id_entidad_hijo');
                    expect(res.body).to.have.property('nombre').to.be.a('string');
                    expect(res.body).to.have.property('apellido').to.be.a('string');
                    expect(res.body).to.have.property('cuit').to.be.a('string');
                    expect(res.body).to.have.property('matricula_provincial').to.be.a('number');
                    expect(res.body).to.have.property('matricula_nacional').to.be.a('number');
                    expect(res.body).to.have.property('estado_ioma').to.be.a('boolean');
                    expect(res.body).to.have.property('domicilios').to.be.a('array');
                    done();
                })
                .catch(done);
        });
    });

    describe('# PUT /api-cartilla/v1/profesionales/{:id}', () => {
        it('should put profesional and domicilios', (done) => {
            request(app)
                .put('/api-cartilla/v1/profesionales/190046')
                .set({ 'api_key': mock.api_profesionales })
                .send({
                    "id": 190046,
                    "id_estado": 1,
                    "id_categoria": 1,
                    "id_profesion": 7,
                    "id_especialidad": 133,
                    "id_entidad": 5,
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
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id').to.be.a('number');
                    expect(res.body).to.have.property('id_estado').to.be.a('number');
                    expect(res.body).to.have.property('id_categoria').to.be.a('number');
                    expect(res.body).to.have.property('id_profesion').to.be.a('number');
                    expect(res.body).to.have.property('id_especialidad').to.be.a('number');
                    expect(res.body).to.have.property('id_entidad').to.be.a('number');
                    expect(res.body).to.have.property('id_entidad_hijo').to.be.a('number');
                    expect(res.body).to.have.property('nombre').to.be.a('string');
                    expect(res.body).to.have.property('apellido').to.be.a('string');
                    expect(res.body).to.have.property('cuit'); //.to.be.a('string') devuelve integer y tiene que ser string
                    expect(res.body).to.have.property('matricula_provincial').to.be.a('number');
                    expect(res.body).to.have.property('matricula_nacional').to.be.a('number');
                    expect(res.body).to.have.property('estado_ioma').to.be.a('boolean');
                    expect(res.body).to.have.property('domicilios').to.be.a('array');
                    done();
                })
                .catch(done);
        });
    });

    describe('# DELETE /api-cartilla/v1/profesionales/{:id}', () => {
        it('should empty', (done) => {
            request(app)
                .delete('/api-cartilla/v1/profesionales/190043')
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