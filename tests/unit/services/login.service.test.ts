import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';

chai.use(chaiHttp);

describe('Login Service Layer', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('should successfully log in with correct password', async function () {
    // Arrange
    const mockUser = UserModel.build({
      id: 1,
      username: 'Eddie',
      vocation: 'Guereiro',
      level: 8,
      password: '$2a$10$jMSNxzsm1ULBnNHUm4o1jee7FkZwXF4juSloStCU4S4XMoEujjIeK',
    });

    // Stub UserModel.findOne to return the mock user
    sinon.stub(UserModel, 'findOne').resolves(mockUser);

    // Act
    const response = await chai
      .request(app)
      .post('/login')
      .send({ username: 'Eddie', password: 'sortudo' });

    // Assert
    expect(response).to.have.status(200);
    
  });

  it('should return 401 for login with incorrect password', async function () {
    // Arrange
    const mockUser = UserModel.build({
      id: 1,
      username: 'Vegeta',
      vocation: 'Sayajin',
      level: 9,
      password: 'ItsOver9000',
    });

    // Stub UserModel.findOne to return the mock user
    sinon.stub(UserModel, 'findOne').resolves(mockUser);

    // Act
    const response = await chai
      .request(app)
      .post('/login')
      .send({ username: 'Vegeta', password: 'kakaroto' });

    // Assert
    expect(response).to.have.status(401);

  });

    it('should return 400 for login with empty username', async function () {
      // Arrange
      const expectedErrorMessage = '"username" and "password" are required';
      const findOneStub = sinon.stub(UserModel, 'findOne').rejects(new Error(expectedErrorMessage));
  
      // Act
      const response = await chai
        .request(app)
        .post('/login')
        .send({ password: 'valquíria' });
  
      // Assert
      expect(response).to.have.status(400);
      expect(response.body).to.deep.equal({ message: expectedErrorMessage });
  
      // Clean up
      findOneStub.restore();
    });


  });