const limit = require('../config/config').default.selectLimit;
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('..');

chai.config.includeStack = true;

const mock = require('./data.mock');

describe('## Farmacias APIs', () => {

    describe('# GET /api-cartilla/v1/farmacias', () => {
        it('should get all farmacias', (done) => {
            request(app)
                .get('/api-cartilla/v1/farmacias')
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
                    expect(res.body.rows[0]).to.have.property('id_entidad').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_entidad_hijo');
                    expect(res.body.rows[0]).to.have.property('nombre').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('razon_social').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('cuit').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('estado_ioma').to.be.a('boolean');
                    expect(res.body.rows[0]).to.have.property('estado_prestador').to.be.a('boolean');
                    expect(res.body.rows[0]).to.have.property('entidad').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('entidad_hijo');
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/farmacias?limit=3&offset=2', () => {
        it('should get farmacias with params limit=3 and offset=2', (done) => {
            request(app)
                .get('/api-cartilla/v1/farmacias?limit=3&offset=2')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_entidad').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_entidad_hijo');
                    expect(res.body.rows[0]).to.have.property('nombre').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('razon_social').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('cuit').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('estado_ioma').to.be.a('boolean');
                    expect(res.body.rows[0]).to.have.property('estado_prestador').to.be.a('boolean');
                    expect(res.body.rows[0]).to.have.property('entidad').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('entidad_hijo');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(22);
                    expect(res.body.rows).to.have.lengthOf(3);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/farmacias?sort=id desc', () => {
        it('should get farmacias with params sort=id desc', (done) => {
            request(app)
                .get('/api-cartilla/v1/farmacias?sort=id desc')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_entidad').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_entidad_hijo');
                    expect(res.body.rows[0]).to.have.property('nombre').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('razon_social').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('cuit').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('estado_ioma').to.be.a('boolean');
                    expect(res.body.rows[0]).to.have.property('estado_prestador').to.be.a('boolean');
                    expect(res.body.rows[0]).to.have.property('entidad').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('entidad_hijo');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(20);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/farmacias?filter=id eq eq 25', () => {
        it('should get farmacias with params filter=id eq 25', (done) => {
            request(app)
                .get('/api-cartilla/v1/farmacias?filter=id eq 25')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_entidad').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_entidad_hijo');
                    expect(res.body.rows[0]).to.have.property('nombre').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('razon_social').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('cuit').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('estado_ioma').to.be.a('boolean');
                    expect(res.body.rows[0]).to.have.property('estado_prestador').to.be.a('boolean');
                    expect(res.body.rows[0]).to.have.property('entidad').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('entidad_hijo');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(25);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/farmacias/{:id}', () => {
        it('should get farmacias whith id 25', (done) => {
            request(app)
                .get('/api-cartilla/v1/farmacias/25')
                .set({ 'api_key': mock.api_key })
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
                    expect(res.body).to.have.property('estado_prestador').to.be.a('boolean');
                    expect(res.body).to.have.property('entidad').to.be.a('object');
                    expect(res.body).to.have.property('entidad_hijo');
                    expect(res.body).to.have.property('id').to.be.equal(25);
                    done();
                })
                .catch(done);
        });
    });


    describe('# GET /api-cartilla/v1/farmacias/domicilios', () => {
        it('should get all farmacias and all domicilios', (done) => {
            request(app)
                .get('/api-cartilla/v1/farmacias/domicilios')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.limit < limit).to.be.ok;
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_entidad').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_entidad_hijo');
                    expect(res.body.rows[0]).to.have.property('nombre').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('razon_social').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('cuit').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('estado_ioma').to.be.a('boolean');
                    expect(res.body.rows[0]).to.have.property('estado_prestador').to.be.a('boolean');
                    expect(res.body.rows[0]).to.have.property('entidad').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('entidad_hijo');
                    expect(res.body.rows[0]).to.have.property('domicilios').to.be.a('array');
                    expect(res.body.rows[0].domicilios[0]).to.have.property('telefonos').to.be.a('array');
                    expect(res.body.rows[0].domicilios[0]).to.have.property('horarios_atencion').to.be.a('array');
                    expect(res.body.rows[0].domicilios[0]).to.have.property('partido').to.be.a('object');
                    expect(res.body.rows[0].domicilios[0]).to.have.property('localidad').to.be.a('object');
                    expect(res.body.rows[0].domicilios[0]).to.have.property('barrio');
                    done();
                })
                .catch(done);
        });
    });
});