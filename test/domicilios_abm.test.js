const limit = require('../config/config').default.selectLimit;
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('..');

chai.config.includeStack = true;

const mock = require('./data.mock');

describe('## Domicilios APIs ABM', () => {

    describe('# POST /api-cartilla/v1/domicilios', () => {
        it('should return error role invalid', (done) => {
            request(app)
                .post('/api-cartilla/v1/domicilios')
                .set({ 'api_key': mock.api_key })
                .send({
                    "id_profesional": 190046,
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
                })
                .expect(401)
                .then(() => { done(); })
                .catch(done);
        });
    });

    describe('# PUT /api-cartilla/v1/domicilios/{:id}', () => {
        it('should error params id not equal body id', (done) => {
            request(app)
                .put('/api-cartilla/v1/domicilios/91869')
                .set({ 'api_key': mock.api_profesionales })
                .send({
                    "id": 91868,
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


    describe('# POST /api-cartilla/v1/domicilios', () => {
        it('should insert profesional and domicilios', (done) => {
            request(app)
                .post('/api-cartilla/v1/domicilios')
                .set({ 'api_key': mock.api_profesionales })
                .send({
                    "id_profesional": 39,
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
                })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id').to.be.a('number');
                    expect(res.body).to.have.property('id_localidad').to.be.a('number');
                    expect(res.body).to.have.property('id_partido').to.be.a('number');
                    expect(res.body).to.have.property('id_barrio');
                    expect(res.body).to.have.property('id_profesional');
                    expect(res.body).to.have.property('codigo_postal').to.be.a('number');
                    expect(res.body).to.have.property('calle').to.be.a('string');
                    expect(res.body).to.have.property('altura').to.be.a('string');
                    expect(res.body).to.have.property('piso').to.be.a('number');
                    expect(res.body).to.have.property('departamento').to.be.a('string');
                    expect(res.body).to.have.property('latitud').to.be.a('number');
                    expect(res.body).to.have.property('longitud').to.be.a('number');
                    expect(res.body).to.have.property('telefonos').to.be.a('array');
                    expect(res.body).to.have.property('horarios_atencion').to.be.a('array');
                    done();
                })
                .catch(done);
        });
    });

    describe('# PUT /api-cartilla/v1/domicilios/{:id}', () => {
        it('should put domicilios', (done) => {
            request(app)
                .put('/api-cartilla/v1/domicilios/91865')
                .set({ 'api_key': mock.api_profesionales })
                .send({
                    "id": 91865,
                    "id_entidad": 2,
                    "id_localidad": 2,
                    "id_partido": 2,
                    "id_barrio": 50,
                    "id_profesional": 190035,
                    "codigo_postal": 1900,
                    "calle": "Falsa",
                    "altura": "123",
                    "piso": 3,
                    "departamento": "B",
                    "longitud": 1.23,
                    "latitud": -32.645,
                    "telefonos": [{
                            "id": 81020,
                            "id_domicilio": 91865,
                            "codigo_area": 221,
                            "numero": 12345678,
                            "interno": 2
                        },
                        {
                            "id": 81021,
                            "id_domicilio": 91865,
                            "codigo_area": 221,
                            "numero": 12345678,
                            "interno": 2
                        }
                    ],
                    "horarios_atencion": [{
                        "id": 1130,
                        "id_domicilio": 91865,
                        "dia": "Lunes",
                        "desde_1": "09:00",
                        "hasta_1": "12:00",
                        "desde_2": "14:00",
                        "hasta_2": "19:00"
                    }]
                })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id').to.be.a('number');
                    expect(res.body).to.have.property('id_localidad').to.be.a('number');
                    expect(res.body).to.have.property('id_partido').to.be.a('number');
                    expect(res.body).to.have.property('id_barrio');
                    expect(res.body).to.have.property('id_profesional');
                    expect(res.body).to.have.property('codigo_postal').to.be.a('number');
                    expect(res.body).to.have.property('calle').to.be.a('string');
                    expect(res.body).to.have.property('altura').to.be.a('string');
                    expect(res.body).to.have.property('piso').to.be.a('number');
                    expect(res.body).to.have.property('departamento').to.be.a('string');
                    expect(res.body).to.have.property('latitud').to.be.a('number');
                    expect(res.body).to.have.property('longitud').to.be.a('number');
                    expect(res.body).to.have.property('telefonos').to.be.a('array');
                    expect(res.body).to.have.property('horarios_atencion').to.be.a('array');
                    done();
                })
                .catch(done);
        });
    });

    describe('# DELETE /api-cartilla/v1/domicilios/{:id}', () => {
        it('should empty', (done) => {
            request(app)
                .delete('/api-cartilla/v1/domicilios/91869')
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