const testServer = require('../app');
const chai = require('chai');
const chaiHttpSwagger = require('chai-http-swagger')
const path = require('path')
const { expect } = chai;
const should = chai.should();

chai.use(chaiHttpSwagger.httpClient)

const app = testServer.server
describe('Test user APIs', () => {
  let targetUser = {};
  
  describe('USERS API', () => {

    it('should create user', (done) => {
      const data = {
        username: 'Abdullah',
        position: 'Engineer'
      }
      chai.request({
        app,
        method: 'post',
        path: '/users',
        body: {
          json: data
        }
      })
        // .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('Object');
          targetUser = res.body
          done()
        })
    });

    it('should all users list', (done) => {
      chai.request({
        app,
        method: 'get',
        path: '/users',
      })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('Object');
          done()
        })
    })

    it('should get user by userId ', (done) => {
      chai.request({
        app,
        method: 'get',
        path: '/users/:id',
        params: {
          path: { id: 1 }
        },
      })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('Object');
          done()
        })
    })

    it('should Update username', (done) => {
      const data = {
        username: 'Bilal',
        position: 'Engineer'
      }

      chai.request({
        app,
        method: 'put',
        path: '/users/:id',
        params: {
          path: { id: 1 }
        },
        body: {
          json: data
        }
      })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('Object');
          done()
        })
    })

    it('should delete user by userId ', (done) => {
      chai.request({
        app,
        method: 'delete',
        path: '/users/:id',
        params: {
          path: { id: targetUser.id }
        },
      })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('Object');
          done()
        })
    })
  })
})