const limit = require('../config/config').default.selectLimit;
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../index');

chai.config.includeStack = true;

const mock = require('./data.mock');

describe('## Barrios APIs', () => {

    describe('# Test first request', () => {
        it('succes response', (done) => {
            request(app)
            done();
        });
    });

    describe('# GET /api-cartilla/v1/barrios', () => {
        it('should get all barrios', (done) => {
            request(app)
                .get('/api-cartilla/v1/barrios')
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
                    expect(res.body.rows[0]).to.have.property('codigo_postal').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('descripcion').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('id_localidad').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/barrios?limit=3&offset=2', () => {
        it('should get barrios with params limit=3 and offset=2', (done) => {
            request(app)
                .get('/api-cartilla/v1/barrios?limit=3&offset=2')
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
                    expect(res.body.rows[0]).to.have.property('codigo_postal').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('descripcion').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('id_localidad').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(52);
                    expect(res.body.rows).to.have.lengthOf(3);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/barrios?sort=id desc', () => {
        it('should get barrios with params sort=id desc', (done) => {
            request(app)
                .get('/api-cartilla/v1/barrios?sort=id desc')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('codigo_postal').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('descripcion').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('id_localidad').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(97);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/barrios?filter=descripcion eq Villa Real', () => {
        it('should get barrios with params filter=descripcion eq Villa Real', (done) => {
            request(app)
                .get('/api-cartilla/v1/barrios?filter=descripcion eq Villa Real')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('codigo_postal').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('descripcion').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('id_localidad').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(93);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/barrios/{:id}', () => {
        it('should get barrio whith id 50', (done) => {
            request(app)
                .get('/api-cartilla/v1/barrios/50')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('codigo_postal').to.be.a('number');
                    expect(res.body).to.have.property('descripcion').to.be.a('string');
                    expect(res.body).to.have.property('id_localidad').to.be.a('number');
                    expect(res.body).to.have.property('id').to.be.equal(50);
                    done();
                })
                .catch(done);
        });
    });
});