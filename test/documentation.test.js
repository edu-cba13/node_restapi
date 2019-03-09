const limit = require('../config/config').default.selectLimit;
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('..');

chai.config.includeStack = true;

const mock = require('./data.mock');

describe('## Documentation APIs', () => {

    describe('# GET /api-cartilla/v1/documentation', () => {
        it('should return documentation format json', (done) => {
            request(app)
                .get('/api-cartilla/v1/documentation')
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    done();
                })
                .catch(done);
        });
    });
});