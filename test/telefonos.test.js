const limit = require('../config/config').default.selectLimit;
const config = require('../config/config');
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('..');

chai.config.includeStack = true;

const mock = require('./data.mock');

describe('## Telefonos APIs', () => {

    describe('# GET /api-cartilla/v1/telefonos', () => {
        it('should get all telefonos', (done) => {
            request(app)
                .get('/api-cartilla/v1/telefonos')
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
                    expect(res.body.rows[0]).to.have.property('id_domicilio').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('codigo_area').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('numero').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('interno').to.be.a('number');
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/telefonos?limit=3&offset=2', () => {
        it('should get telefonos with params limit=3 and offset=2', (done) => {
            request(app)
                .get('/api-cartilla/v1/telefonos?limit=3&offset=2')
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
                    expect(res.body.rows[0]).to.have.property('id_domicilio').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('codigo_area').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('numero').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('interno').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(11);
                    expect(res.body.rows).to.have.lengthOf(3);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/telefonos?sort=id desc', () => {
        it('should get telefonos with params sort=id desc', (done) => {
            request(app)
                .get('/api-cartilla/v1/telefonos?sort=id asc')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_domicilio').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('codigo_area').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('numero').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('interno').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(9);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/telefonos?filter=id eq 9', () => {
        it('should get telefonos with params filter=id eq 9', (done) => {
            request(app)
                .get('/api-cartilla/v1/telefonos?filter=id eq 9')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_domicilio').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('codigo_area').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('numero').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('interno').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(9);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/telefonos/{:id}', () => {
        it('should get telefonos whith id 9', (done) => {
            request(app)
                .get('/api-cartilla/v1/telefonos/9')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id').to.be.a('number');
                    expect(res.body).to.have.property('id_domicilio').to.be.a('number');
                    expect(res.body).to.have.property('codigo_area').to.be.a('number');
                    expect(res.body).to.have.property('numero').to.be.a('number');
                    expect(res.body).to.have.property('interno').to.be.a('number');
                    expect(res.body).to.have.property('id').to.be.equal(9);
                    done();
                })
                .catch(done);
        });
    });

});