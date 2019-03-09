const limit = require('../config/config').default.selectLimit;
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('..');

chai.config.includeStack = true;

const mock = require('./data.mock');

describe('## Localidades APIs', () => {

    describe('# GET /api-cartilla/v1/localidades', () => {
        it('should get all localidades', (done) => {
            request(app)
                .get('/api-cartilla/v1/localidades')
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
                    expect(res.body.rows[0]).to.have.property('id_partido').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/localidades/barrios?filter=id eq 21', () => {
        it('should get all localidades and barrios?filter=id eq 21', (done) => {
            request(app)
                .get('/api-cartilla/v1/localidades/barrios?filter=id eq 21')
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
                    expect(res.body.rows[0]).to.have.property('id_partido').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0].barrios[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0].barrios[0]).to.have.property('id_localidad').to.be.a('number');
                    expect(res.body.rows[0].barrios[0]).to.have.property('descripcion').to.be.a('string');
                    expect(res.body.rows[0].barrios[0]).to.have.property('codigo_postal').to.be.a('number');

                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/localidades?limit=3&offset=2', () => {
        it('should get localidades with params limit=3 and offset=2', (done) => {
            request(app)
                .get('/api-cartilla/v1/localidades?limit=3&offset=2')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('codigo_postal').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('descripcion').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('id_partido').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(4);
                    expect(res.body.rows).to.have.lengthOf(3);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/localidades?sort=id desc', () => {
        it('should get localidades with params sort=id desc', (done) => {
            request(app)
                .get('/api-cartilla/v1/localidades?sort=id desc')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('codigo_postal').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('descripcion').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('id_partido').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(2516);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/localidades?filter=descripcion eq AMEGHINO', () => {
        it('should get localidades with params filter=descripcion eq AMEGHINO', (done) => {
            request(app)
                .get('/api-cartilla/v1/localidades?filter=descripcion eq AMEGHINO')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('codigo_postal').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('descripcion').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('id_partido').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(5);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/localidades/{:id}', () => {
        it('should get barrio whith id 50', (done) => {
            request(app)
                .get('/api-cartilla/v1/localidades/50')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('codigo_postal').to.be.a('number');
                    expect(res.body).to.have.property('descripcion').to.be.a('string');
                    expect(res.body).to.have.property('id_partido').to.be.a('number');
                    expect(res.body).to.have.property('id').to.be.equal(50);
                    done();
                })
                .catch(done);
        });
    });


});