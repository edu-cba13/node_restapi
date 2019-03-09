const limit = require('../config/config').default.selectLimit;
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('..');

chai.config.includeStack = true;

const mock = require('./data.mock');

describe('## Partidos APIs', () => {

    describe('# GET /api-cartilla/v1/partidos', () => {
        it('should get all partidos', (done) => {
            request(app)
                .get('/api-cartilla/v1/partidos')
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

    describe('# GET /api-cartilla/v1/partidos/localidades?filter=id eq 21', () => {
        it('should get all partidos and localidades?filter=id eq 21', (done) => {
            request(app)
                .get('/api-cartilla/v1/partidos/localidades?filter=id eq 21')
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
                    expect(res.body.rows[0].localidades[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0].localidades[0]).to.have.property('id_partido').to.be.a('number');
                    expect(res.body.rows[0].localidades[0]).to.have.property('descripcion').to.be.a('string');
                    expect(res.body.rows[0].localidades[0]).to.have.property('codigo_postal').to.be.a('number');

                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/partidos?limit=3&offset=2', () => {
        it('should get partidos with params limit=3 and offset=2', (done) => {
            request(app)
                .get('/api-cartilla/v1/partidos?limit=3&offset=2')
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
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(4);
                    expect(res.body.rows).to.have.lengthOf(3);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/partidos?sort=id desc', () => {
        it('should get partidos with params sort=id desc', (done) => {
            request(app)
                .get('/api-cartilla/v1/partidos?sort=id desc')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('descripcion').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(138);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/partidos?filter=descripcion eq ALBERTI', () => {
        it('should get partidos with params filter=descripcion eq ALBERTI', (done) => {
            request(app)
                .get('/api-cartilla/v1/partidos?filter=descripcion eq ALBERTI')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('descripcion').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(5);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/partidos/{:id}', () => {
        it('should get barrio whith id 50', (done) => {
            request(app)
                .get('/api-cartilla/v1/partidos/50')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('descripcion').to.be.a('string');
                    expect(res.body).to.have.property('id').to.be.equal(50);
                    done();
                })
                .catch(done);
        });
    });
});