import sinon from 'sinon';
import OrderModel from '../../../src/database/models/order.model';
import app from '../../../src/app';
import chai, { expect } from 'chai';
import { listOrders } from '../../../src/services/orders.service'; 
import { createNewOrder } from '../../../src/services/orders.service';
import ProductModel from '../../../src/database/models/product.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import UserModel from '../../../src/database/models/user.model';


describe('ListOrders', function () {
  beforeEach(function () { sinon.restore(); });

  it('should successfully get all orders', async function () {
    const mockedResult = [];
    const findAllStub = sinon.stub(OrderModel, 'findAll');
    findAllStub.resolves([]);

    const response = await chai.request(app).get('/orders');

    expect(response).to.have.status(200);
    expect(response.body).to.be.deep.equal([]);
  }
  );

  it('should map productIds if available', async () => {
    const orders = [
      {
        id: 1,
        userId: 1,
        dataValues: {
          id: 1,
          userId: 1,
          productIds: [
            { id: 101, name: 'Product A' },
            { id: 102, name: 'Product B' },
          ],
        },
      },
    ];

    const findAllStub = sinon.stub(OrderModel, 'findAll').resolves(orders as any);

    const result = await listOrders();
    
    expect(result).to.deep.equal([
      {
        id: 1,
        userId: 1,
        productIds: [101, 102],
      },
    ]);

    findAllStub.restore();
  });

  it('should handle empty productIds array', async () => {
    const orders = [
      {
        id: 2,
        userId: 2,
        dataValues: {
          id: 2,
          userId: 2,
          productIds: [],
        },
      },
    ];

    const findAllStub = sinon.stub(OrderModel, 'findAll').resolves(orders as any);

    const result = await listOrders();

    expect(result).to.deep.equal([
      {
        id: 2,
        userId: 2,
        productIds: [],
      },
    ]);
  });

  it('should successfully create a new order', async function () {
    // Arrange
    const mockedOrder = OrderModel.build({ userId: 1 });
    const mockedUser = UserModel.build({
      id: 1,
      username: 'Luke Ghostwalker',
      vocation: 'Jedi do futuro',
      level: 369,
      password: 'hashed_password',
    });

    sinon.stub(OrderModel, 'create').resolves(mockedOrder);
    sinon.stub(jwt, 'verify').resolves();
    sinon.stub(ProductModel, 'update').resolves([1]);
    sinon.stub(bcrypt, 'compareSync').returns(true);
    sinon.stub(UserModel, 'findOne').resolves(mockedUser);

    // Act
    const response = await chai
      .request(app)
      .post('/orders')
      .send({ userId: 1, productIds: [1, 2] })
      .set('Authorization', '123456');

    // Assert
    expect(response.status).to.equal(201);

    // Clean up (restore stubs)
    sinon.restore();
  });
});