const limit = require('../config/config').default.selectLimit;
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../index');

chai.config.includeStack = true;

const mock = require('./data.mock');

describe('## Categorias APIs', () => {

    describe('# GET /api-cartilla/v1/categorias', () => {
        it('should get all categorias', (done) => {
            request(app)
                .get('/api-cartilla/v1/categorias')
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

    describe('# GET /api-cartilla/v1/categorias?limit=3&offset=2', () => {
        it('should get categorias with params limit=3 and offset=2', (done) => {
            request(app)
                .get('/api-cartilla/v1/categorias?limit=3&offset=2')
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
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(3);
                    expect(res.body.rows).to.have.lengthOf(2);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/categorias?sort=id desc', () => {
        it('should get categorias with params sort=id desc', (done) => {
            request(app)
                .get('/api-cartilla/v1/categorias?sort=id desc')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('descripcion').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(4);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/categorias?filter=descripcion eq B', () => {
        it('should get categorias with params filter=descripcion eq B', (done) => {
            request(app)
                .get('/api-cartilla/v1/categorias?filter=descripcion eq B')
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

    describe('# GET /api-cartilla/v1/categorias/{:id}', () => {
        it('should get categorias whith id 1', (done) => {
            request(app)
                .get('/api-cartilla/v1/categorias/1')
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

});