const limit = require('../config/config').default.selectLimit;
const config = require('../config/config');
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('..');

chai.config.includeStack = true;

const mock = require('./data.mock');

describe('## Horarios atencion APIs', () => {

    describe('# GET /api-cartilla/v1/horariosatencion', () => {
        it('should get all horarios atencion', (done) => {
            request(app)
                .get('/api-cartilla/v1/horariosatencion')
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
                    expect(res.body.rows[0]).to.have.property('desde_1').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('hasta_1').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('desde_2').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('hasta_2').to.be.a('string');
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/horariosatencion?limit=3&offset=2', () => {
        it('should get horarios atencion with params limit=3 and offset=2', (done) => {
            request(app)
                .get('/api-cartilla/v1/horariosatencion?limit=3&offset=2')
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
                    expect(res.body.rows[0]).to.have.property('desde_1').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('hasta_1').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('desde_2').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('hasta_2').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(7);
                    expect(res.body.rows).to.have.lengthOf(3);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/horariosatencion?sort=id desc', () => {
        it('should get horarios atencion with params sort=id desc', (done) => {
            request(app)
                .get('/api-cartilla/v1/horariosatencion?sort=id asc')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_domicilio').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('desde_1').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('hasta_1').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('desde_2').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('hasta_2').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(5);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/horariosatencion?filter=id eq 5', () => {
        it('should get horarios atencion with params filter=id eq 5', (done) => {
            request(app)
                .get('/api-cartilla/v1/horariosatencion?filter=id eq 5')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_domicilio').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('desde_1').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('hasta_1').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('desde_2').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('hasta_2').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(5);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/horariosatencion/{:id}', () => {
        it('should get horarios atencion whith id 5', (done) => {
            request(app)
                .get('/api-cartilla/v1/horariosatencion/5')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id').to.be.a('number');
                    expect(res.body).to.have.property('id_domicilio').to.be.a('number');
                    expect(res.body).to.have.property('dia').to.be.a('string');
                    expect(res.body).to.have.property('desde_1').to.be.a('string');
                    expect(res.body).to.have.property('hasta_1').to.be.a('string');
                    expect(res.body).to.have.property('desde_2').to.be.a('string');
                    expect(res.body).to.have.property('hasta_2').to.be.a('string');
                    expect(res.body).to.have.property('id').to.be.equal(5);
                    done();
                })
                .catch(done);
        });
    });

});