const limit = require('../config/config').default.selectLimit;
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('..');

chai.config.includeStack = true;

const mock = require('./data.mock');

describe('## Domicilios APIs', () => {

    describe('# GET /api-cartilla/v1/domicilios', () => {
        it('should get all domicilios', (done) => {
            request(app)
                .get('/api-cartilla/v1/domicilios')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.limit).to.be.a('number');
                    expect(res.body.offset).to.be.a('number');
                    expect(res.body.limit <= limit).to.be.ok;
                    expect(res.body.offset >= 0).to.be.ok;
                    expect(res.body.count >= 0).to.be.ok;
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_localidad').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_partido').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_barrio');
                    expect(res.body.rows[0]).to.have.property('id_profesional');
                    expect(res.body.rows[0]).to.have.property('id_farmacia');
                    expect(res.body.rows[0]).to.have.property('id_clinica');
                    expect(res.body.rows[0]).to.have.property('id_clinica_alta_complejidad');
                    expect(res.body.rows[0]).to.have.property('codigo_postal').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('calle').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('altura').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('piso').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('departamento').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('latitud').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('longitud').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('time_create');
                    expect(res.body.rows[0]).to.have.property('time_modify');
                    expect(res.body.rows[0]).to.have.property('telefonos').to.be.a('array');
                    expect(res.body.rows[0]).to.have.property('horarios_atencion').to.be.a('array');
                    expect(res.body.rows[0]).to.have.property('partido').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('localidad').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('barrio');
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/domicilios?limit=3&offset=2', () => {
        it('should get domicilios with params limit=3 and offset=2', (done) => {
            request(app)
                .get('/api-cartilla/v1/domicilios?limit=3&offset=2')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.limit).to.be.a('number');
                    expect(res.body.offset).to.be.a('number');
                    expect(res.body.limit <= limit).to.be.ok;
                    expect(res.body.offset >= 0).to.be.ok;
                    expect(res.body.count >= 0).to.be.ok;
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_localidad').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_partido').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_barrio');
                    expect(res.body.rows[0]).to.have.property('id_profesional');
                    expect(res.body.rows[0]).to.have.property('id_farmacia');
                    expect(res.body.rows[0]).to.have.property('id_clinica');
                    expect(res.body.rows[0]).to.have.property('id_clinica_alta_complejidad');
                    expect(res.body.rows[0]).to.have.property('codigo_postal').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('calle').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('altura').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('piso').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('departamento').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('latitud').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('longitud').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('time_create');
                    expect(res.body.rows[0]).to.have.property('time_modify');
                    expect(res.body.rows[0]).to.have.property('telefonos').to.be.a('array');
                    expect(res.body.rows[0]).to.have.property('horarios_atencion').to.be.a('array');
                    expect(res.body.rows[0]).to.have.property('partido').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('localidad').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('barrio');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(18);
                    expect(res.body.rows).to.have.lengthOf(3);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/domicilios?sort=id desc', () => {
        it('should get domicilios with params sort=id desc', (done) => {
            request(app)
                .get('/api-cartilla/v1/domicilios?sort=id desc')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.limit).to.be.a('number');
                    expect(res.body.offset).to.be.a('number');
                    expect(res.body.limit <= limit).to.be.ok;
                    expect(res.body.offset >= 0).to.be.ok;
                    expect(res.body.count >= 0).to.be.ok;
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_localidad').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_partido').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_barrio');
                    expect(res.body.rows[0]).to.have.property('id_profesional');
                    expect(res.body.rows[0]).to.have.property('id_farmacia');
                    expect(res.body.rows[0]).to.have.property('id_clinica');
                    expect(res.body.rows[0]).to.have.property('id_clinica_alta_complejidad');
                    expect(res.body.rows[0]).to.have.property('codigo_postal').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('calle').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('altura').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('piso').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('departamento').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('latitud').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('longitud').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('time_create');
                    expect(res.body.rows[0]).to.have.property('time_modify');
                    expect(res.body.rows[0]).to.have.property('telefonos').to.be.a('array');
                    expect(res.body.rows[0]).to.have.property('horarios_atencion').to.be.a('array');
                    expect(res.body.rows[0]).to.have.property('partido').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('localidad').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('barrio');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(23);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/domicilios?filter=id eq eq 23', () => {
        it('should get domicilios with params filter=id eq 23', (done) => {
            request(app)
                .get('/api-cartilla/v1/domicilios?filter=id eq 23')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.limit).to.be.a('number');
                    expect(res.body.offset).to.be.a('number');
                    expect(res.body.limit <= limit).to.be.ok;
                    expect(res.body.offset >= 0).to.be.ok;
                    expect(res.body.count >= 0).to.be.ok;
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_localidad').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_partido').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_barrio');
                    expect(res.body.rows[0]).to.have.property('id_profesional');
                    expect(res.body.rows[0]).to.have.property('id_farmacia');
                    expect(res.body.rows[0]).to.have.property('id_clinica');
                    expect(res.body.rows[0]).to.have.property('id_clinica_alta_complejidad');
                    expect(res.body.rows[0]).to.have.property('codigo_postal').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('calle').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('altura').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('piso').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('departamento').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('latitud').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('longitud').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('time_create');
                    expect(res.body.rows[0]).to.have.property('time_modify');
                    expect(res.body.rows[0]).to.have.property('telefonos').to.be.a('array');
                    expect(res.body.rows[0]).to.have.property('horarios_atencion').to.be.a('array');
                    expect(res.body.rows[0]).to.have.property('partido').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('localidad').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('barrio');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(23);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/domicilios/{:id}', () => {
        it('should get domicilios whith id 23', (done) => {
            request(app)
                .get('/api-cartilla/v1/domicilios/23')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id').to.be.a('number');
                    expect(res.body).to.have.property('id_localidad').to.be.a('number');
                    expect(res.body).to.have.property('id_partido').to.be.a('number');
                    expect(res.body).to.have.property('id_barrio');
                    expect(res.body).to.have.property('id_profesional');
                    expect(res.body).to.have.property('id_farmacia');
                    expect(res.body).to.have.property('id_clinica');
                    expect(res.body).to.have.property('id_clinica_alta_complejidad');
                    expect(res.body).to.have.property('codigo_postal').to.be.a('number');
                    expect(res.body).to.have.property('calle').to.be.a('string');
                    expect(res.body).to.have.property('altura').to.be.a('string');
                    expect(res.body).to.have.property('piso').to.be.a('number');
                    expect(res.body).to.have.property('departamento').to.be.a('string');
                    expect(res.body).to.have.property('latitud').to.be.a('number');
                    expect(res.body).to.have.property('longitud').to.be.a('number');
                    expect(res.body).to.have.property('time_create');
                    expect(res.body).to.have.property('time_modify');
                    expect(res.body).to.have.property('telefonos').to.be.a('array');
                    expect(res.body).to.have.property('horarios_atencion').to.be.a('array');
                    expect(res.body).to.have.property('partido').to.be.a('object');
                    expect(res.body).to.have.property('localidad').to.be.a('object');
                    expect(res.body).to.have.property('barrio');
                    expect(res.body).to.have.property('id').to.be.equal(23);
                    done();
                })
                .catch(done);
        });
    });
});