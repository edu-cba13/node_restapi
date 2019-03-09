const limit = require('../config/config').default.selectLimit;
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../index');

chai.config.includeStack = true;

const mock = require('./data.mock');

describe('## Profesiones APIs', () => {

    describe('# GET /api-cartilla/v1/profesiones', () => {
        it('should get all profesiones', (done) => {
            request(app)
                .get('/api-cartilla/v1/profesiones')
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
                    expect(res.body.rows[0]).to.have.property('descripcion').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/profesiones?limit=3&offset=2', () => {
        it('should get profesiones with params limit=3 and offset=2', (done) => {
            request(app)
                .get('/api-cartilla/v1/profesiones?limit=3&offset=2')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('descripcion').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(3);
                    expect(res.body.rows).to.have.lengthOf(3);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/profesiones?sort=id desc', () => {
        it('should get profesiones with params sort=id desc', (done) => {
            request(app)
                .get('/api-cartilla/v1/profesiones?sort=id desc')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('descripcion').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(11);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/profesiones?filter=descripcion eq ENFERMERO', () => {
        it('should get profesiones with params filter=descripcion eq ENFERMERO', (done) => {
            request(app)
                .get('/api-cartilla/v1/profesiones?filter=descripcion eq ENFERMERO')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('descripcion').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(2);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/profesiones/{:id}', () => {
        it('should get profesiones whith id 1', (done) => {
            request(app)
                .get('/api-cartilla/v1/profesiones/1')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('descripcion').to.be.a('string');
                    expect(res.body).to.have.property('id').to.be.a('number');
                    expect(res.body).to.have.property('id').to.be.equal(1);
                    done();
                })
                .catch(done);
        });
    });


    describe('# GET /api-cartilla/v1/profesiones/especialidades', () => {
        it('should get all profesiones and all especialidades', (done) => {
            request(app)
                .get('/api-cartilla/v1/profesiones/especialidades')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.count < limit).to.be.ok;
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('descripcion').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0].especialidades).to.be.an('array');
                    expect(res.body.rows[0].especialidades[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0].especialidades[0]).to.have.property('id_profesion').to.be.a('number');
                    expect(res.body.rows[0].especialidades[0]).to.have.property('descripcion').to.be.a('string');
                    done();
                })
                .catch(done);
        });
    });
});