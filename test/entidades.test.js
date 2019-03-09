const limit = require('../config/config').default.selectLimit;
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../index');

chai.config.includeStack = true;

const mock = require('./data.mock');

describe('## Entidades APIs', () => {

    describe('# GET /api-cartilla/v1/entidades', () => {
        it('should get all entidades', (done) => {
            request(app)
                .get('/api-cartilla/v1/entidades')
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
                    expect(res.body.rows[0]).to.have.property('nombre').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('estado').to.be.a('boolean');
                    expect(res.body.rows[0]).to.have.property('codigo').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('date').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('categoria').to.be.a('string');
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/entidades?limit=3&offset=2', () => {
        it('should get entidades with params limit=3 and offset=2', (done) => {
            request(app)
                .get('/api-cartilla/v1/entidades?limit=3&offset=2')
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
                    expect(res.body.rows[0]).to.have.property('nombre').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('estado').to.be.a('boolean');
                    expect(res.body.rows[0]).to.have.property('codigo').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('date').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('categoria').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(3);
                    expect(res.body.rows).to.have.lengthOf(3);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/entidades?sort=id desc', () => {
        it('should get entidades with params sort=id desc', (done) => {
            request(app)
                .get('/api-cartilla/v1/entidades?sort=id desc')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('nombre').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('estado').to.be.a('boolean');
                    expect(res.body.rows[0]).to.have.property('codigo').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('date').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('categoria').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(177);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/entidades?filter=id eq 1', () => {
        it('should get entidades with params filter=id eq 1', (done) => {
            request(app)
                .get('/api-cartilla/v1/entidades?filter=id eq 1')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('nombre').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('estado').to.be.a('boolean');
                    expect(res.body.rows[0]).to.have.property('codigo').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('date').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('categoria').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(1);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/entidades/{:id}', () => {
        it('should get entidades whith id 1', (done) => {
            request(app)
                .get('/api-cartilla/v1/entidades/1')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id').to.be.a('number');
                    expect(res.body).to.have.property('nombre').to.be.a('string');
                    expect(res.body).to.have.property('estado').to.be.a('boolean');
                    expect(res.body).to.have.property('codigo').to.be.a('number');
                    expect(res.body).to.have.property('date').to.be.a('string');
                    expect(res.body).to.have.property('categoria').to.be.a('string');
                    expect(res.body).to.have.property('id').to.be.equal(1);
                    done();
                })
                .catch(done);
        });
    });

});