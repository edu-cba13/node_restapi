const limit = require('../config/config').default.selectLimit;
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('..');

chai.config.includeStack = true;

const mock = require('./data.mock');

describe('## Health-check APIs', () => {

    describe('# GET /api-cartilla/v1/health-check', () => {
        it('should return message', (done) => {
            request(app)
                .get('/api-cartilla/v1/health-check')
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message').to.be.a('string');
                    done();
                })
                .catch(done);
        });
    });
});