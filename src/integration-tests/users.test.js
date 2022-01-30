const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const sinon = require('sinon');
const server = require('../api/app');
const { MongoClient, ObjectId } = require('mongodb');
const { getConnection } = require('./connectionMock');

describe('POST /users', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock)
  })

  after(async () => {
    MongoClient.connect.restore();
  });
  describe('Verifica se os campos name, email e senha são passados', () => {
    let response;

    before(async () => {
      response = await chai.request(server).post('/users').send({});
    });

    it('retorna o código de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('"message" retornada é "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });
  });

  describe('Verifica se o email é único', () => {
    before(async () => {
      const userCollection = connectionMock.db('Cookmaster').collection('users')
      await userCollection.insertOne({
        username: 'rodrigoaq',
        email: 'rodrigoaq@gmail.com',
        password: 'senhaSecreta',
      });

      response = await chai.request(server).post('/users').send({
        username: 'rodrigoaq',
        email: 'rodrigoaq@gmail.com',
        password: 'senhaSecreta',
      });

    it('retorna o código de status "409"', () => {
      expect(response).to.have.status(409)
    });
    
    it('"message" retornada é "Email already registered"', () => {
      expect(response.body.message).to.be.equals('Email already registered');
    });
  });
});
  describe('Verifica se o cadastro foi feito com sucesso', () => {
    let response;

    before( async () => {
      const userCollection = connectionMock.db('Cookmaster').collection('users')
      await userCollection.insertOne({
        username: 'rodrigoaq',
        password: 'senhaSecreta',
      });

      response = await chai.request(server).post('/users').send({
        username: 'rodrigoaq',
        password: 'senhaSecreta',
      });
    });
  });

    it('retorna o código de status "201"', () => {
      expect(response).to.have.status(201)
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.a('object');
    });

    it('a propriedade "message" não está vazia', () => {
      expect(response.body.message).to.not.be.equals('');
    });
  })
