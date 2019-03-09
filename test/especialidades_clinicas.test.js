const limit = require('../config/config').default.selectLimit;
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../index');

chai.config.includeStack = true;

const mock = require('./data.mock');

describe('## Especialidades Clinicas APIs', () => {

    describe('# GET /api-cartilla/v1/especialidadesclinicas', () => {
        it('should get all especialidadesclinicas', (done) => {
            request(app)
                .get('/api-cartilla/v1/especialidadesclinicas')
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
                    expect(res.body.rows[0]).to.have.property('descripcion').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('codigo');
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/especialidadesclinicas?limit=3&offset=2', () => {
        it('should get especialidades clinicas with params limit=3 and offset=2', (done) => {
            request(app)
                .get('/api-cartilla/v1/especialidadesclinicas?limit=3&offset=2')
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
                    expect(res.body.rows[0]).to.have.property('descripcion').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('codigo');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(30);
                    expect(res.body.rows).to.have.lengthOf(3);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/especialidadesclinicas?sort=id desc', () => {
        it('should get especialidades clinicas with params sort=id desc', (done) => {
            request(app)
                .get('/api-cartilla/v1/especialidadesclinicas?sort=id desc')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('descripcion').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('codigo');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(56);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/especialidadesclinicas?filter=id eq 30', () => {
        it('should get especialidadesclinicas with params filter=id eq 30', (done) => {
            request(app)
                .get('/api-cartilla/v1/especialidadesclinicas?filter=id eq 30')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('descripcion').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('codigo');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(30);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/especialidadesclinicas/{:id}', () => {
        it('should get especialidades clinicas whith id 28', (done) => {
            request(app)
                .get('/api-cartilla/v1/especialidadesclinicas/28')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id').to.be.a('number');
                    expect(res.body).to.have.property('descripcion').to.be.a('string');
                    expect(res.body).to.have.property('codigo');
                    expect(res.body).to.have.property('id').to.be.equal(28);
                    done();
                })
                .catch(done);
        });
    });

});