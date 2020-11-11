const testServer = require('../app');
const chai = require('chai');
const chaiHttpSwagger = require('chai-http-swagger')
const path = require('path')
const { expect } = chai;
const should = chai.should();

chai.use(chaiHttpSwagger.httpClient)

const app = testServer.server
describe('Test Private APIs', () => {
  let targetUser = {};
  
  describe('Get private message', () => {

    it('should get private message', (done) => {
      chai.request({
        app,
        method: 'get',
        path: '/private',
        security: {
          Authorization: 'token' // your token data 
        },
      })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('Object');
          res.body.should.be.a('Object');
          res.body.msg.should.be.equal('PRIVATE_MESSAGE')
          done()
        })
    })
    
  })
})