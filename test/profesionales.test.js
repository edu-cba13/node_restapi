const limit = require('../config/config').default.selectLimit;
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('..');

chai.config.includeStack = true;

const mock = require('./data.mock');

describe('## Profesionales APIs', () => {

    describe('# GET /api-cartilla/v1/profesionales', () => {
        it('should get all profesionales', (done) => {
            request(app)
                .get('/api-cartilla/v1/profesionales')
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
                    expect(res.body.rows[0]).to.have.property('id_estado').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_categoria').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_profesion').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_especialidad').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_entidad').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_entidad_hijo');
                    expect(res.body.rows[0]).to.have.property('nombre').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('apellido').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('cuit').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('matricula_provincial').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('matricula_nacional').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('estado_ioma').to.be.a('boolean');
                    expect(res.body.rows[0]).to.have.property('categoria').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('estado').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('entidad').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('entidad_hijo');
                    expect(res.body.rows[0]).to.have.property('profesion').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('especialidad');
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/profesionales?limit=3&offset=2', () => {
        it('should get profesionales with params limit=3 and offset=2', (done) => {
            request(app)
                .get('/api-cartilla/v1/profesionales?limit=3&offset=2')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_estado').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_categoria').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_profesion').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_especialidad').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_entidad').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_entidad_hijo');
                    expect(res.body.rows[0]).to.have.property('nombre').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('apellido').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('cuit').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('matricula_provincial').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('matricula_nacional').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('estado_ioma').to.be.a('boolean');
                    expect(res.body.rows[0]).to.have.property('categoria').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('estado').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('entidad').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('entidad_hijo');
                    expect(res.body.rows[0]).to.have.property('profesion').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('especialidad');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(32);
                    expect(res.body.rows).to.have.lengthOf(3);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/profesionales?sort=id desc', () => {
        it('should get profesionales with params sort=id desc', (done) => {
            request(app)
                .get('/api-cartilla/v1/profesionales?sort=id desc')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_estado').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_categoria').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_profesion').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_especialidad').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_entidad').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_entidad_hijo');
                    expect(res.body.rows[0]).to.have.property('nombre').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('apellido').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('cuit').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('matricula_provincial').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('matricula_nacional').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('estado_ioma').to.be.a('boolean');
                    expect(res.body.rows[0]).to.have.property('categoria').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('estado').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('entidad').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('entidad_hijo');
                    expect(res.body.rows[0]).to.have.property('profesion').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('especialidad');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(25);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/profesionales?filter=id eq eq 25', () => {
        it('should get profesionales with params filter=id eq 25', (done) => {
            request(app)
                .get('/api-cartilla/v1/profesionales?filter=id eq 25')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_estado').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_categoria').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_profesion').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_especialidad').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_entidad').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_entidad_hijo');
                    expect(res.body.rows[0]).to.have.property('nombre').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('apellido').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('cuit').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('matricula_provincial').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('matricula_nacional').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('estado_ioma').to.be.a('boolean');
                    expect(res.body.rows[0]).to.have.property('categoria').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('estado').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('entidad').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('entidad_hijo');
                    expect(res.body.rows[0]).to.have.property('profesion').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('especialidad');
                    expect(res.body.rows[0]).to.have.property('id').to.be.equal(25);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api-cartilla/v1/profesionales/{:id}', () => {
        it('should get profesionales whith id 25', (done) => {
            request(app)
                .get('/api-cartilla/v1/profesionales/25')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id').to.be.a('number');
                    expect(res.body).to.have.property('id_estado').to.be.a('number');
                    expect(res.body).to.have.property('id_categoria').to.be.a('number');
                    expect(res.body).to.have.property('id_profesion').to.be.a('number');
                    expect(res.body).to.have.property('id_especialidad').to.be.a('number');
                    expect(res.body).to.have.property('id_entidad').to.be.a('number');
                    expect(res.body).to.have.property('id_entidad_hijo');
                    expect(res.body).to.have.property('nombre').to.be.a('string');
                    expect(res.body).to.have.property('apellido').to.be.a('string');
                    expect(res.body).to.have.property('cuit').to.be.a('string');
                    expect(res.body).to.have.property('matricula_provincial').to.be.a('number');
                    expect(res.body).to.have.property('matricula_nacional').to.be.a('number');
                    expect(res.body).to.have.property('estado_ioma').to.be.a('boolean');
                    expect(res.body).to.have.property('categoria').to.be.a('object');
                    expect(res.body).to.have.property('estado').to.be.a('object');
                    expect(res.body).to.have.property('entidad').to.be.a('object');
                    expect(res.body).to.have.property('entidad_hijo');
                    expect(res.body).to.have.property('profesion').to.be.a('object');
                    expect(res.body).to.have.property('especialidad');
                    expect(res.body).to.have.property('id').to.be.equal(25);
                    done();
                })
                .catch(done);
        });
    });


    describe('# GET /api-cartilla/v1/profesionales/domicilios', () => {
        it('should get all profesionales and all domicilios', (done) => {
            request(app)
                .get('/api-cartilla/v1/profesionales/domicilios')
                .set({ 'api_key': mock.api_key })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.count).to.be.a('number');
                    expect(res.body.limit < limit).to.be.ok;
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_estado').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_categoria').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_profesion').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_especialidad').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_entidad').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('id_entidad_hijo');
                    expect(res.body.rows[0]).to.have.property('nombre').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('apellido').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('cuit').to.be.a('string');
                    expect(res.body.rows[0]).to.have.property('matricula_provincial').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('matricula_nacional').to.be.a('number');
                    expect(res.body.rows[0]).to.have.property('estado_ioma').to.be.a('boolean');
                    expect(res.body.rows[0]).to.have.property('categoria').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('estado').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('entidad').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('entidad_hijo');
                    expect(res.body.rows[0]).to.have.property('profesion').to.be.a('object');
                    expect(res.body.rows[0]).to.have.property('especialidad');
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