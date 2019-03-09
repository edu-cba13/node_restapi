const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../index');

chai.config.includeStack = true;

const mock = require('./data.mock');

describe('## Usuarios APIs', () => {

    describe('# POST /api-cartilla/v1/users/login', () => {
        it('should get token', (done) => {
            request(app)
                .post('/api-cartilla/v1/users/login')
                .send({
                    user: 'prog69ab',
                    password: '12345679'
                })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('user').to.be.a('string');
                    expect(res.body).to.have.property('api_key').to.be.a('string');
                    done();
                })
                .catch(done);
        });
    });

    describe('# POST /api-cartilla/v1/users/refresh', () => {
        it('should get token', (done) => {
            request(app)
                .post('/api-cartilla/v1/users/refresh')
                .send({
                    api_key: mock.api_key
                })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('user').to.be.a('string');
                    expect(res.body).to.have.property('api_key').to.be.a('string');
                    done();
                })
                .catch(done);
        });
    });

});