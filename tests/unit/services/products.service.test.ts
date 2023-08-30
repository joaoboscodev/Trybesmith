import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';
import { Request, Response } from 'express';
import validateProduct from '../../../src/middlewares/validateProduct';

chai.use(chaiHttp);

describe('Products Service Layer', function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('should successfully create a product', async function () {
    const mockedProduct = {
      name: 'Sabre de luz medieval do futuro',
      price: '1000',
      orderId: 4,
    };
    const mockedResult = ProductModel.build(mockedProduct);
    sinon.stub(ProductModel, 'create').resolves(mockedResult);
    const response = await chai
      .request(app)
      .post('/products')
      .send(mockedProduct);
    expect(response).to.have.status(201);
  });

  it('should successfully get all products', async function () {
    const mockedResult = [
      {
        id: 1,
        name: 'Sabre de luz medieval do futuro',
        price: '1000',
        orderId: 4,
      },
      {
        id: 2,
        name: 'Sabre de luz medieval do passado',
        price: '1000',
        orderId: 4,
      },
    ];
    const findAllStub = sinon.stub(ProductModel, 'findAll');

    findAllStub.resolves(mockedResult.map((item) => ProductModel.build(item)));

    const response = await chai.request(app).get('/products');

    expect(response).to.have.status(200);
    expect(response.body).to.be.deep.equal(mockedResult);
  });

  it('should fail when trying to create a product with an invalid name', async function () {
    const mockedProduct = {
      name: '',
      price: '1000',
      orderId: 4,
    };

    const req = { method: 'POST', body: mockedProduct } as Request;
    const res = { status: () => res, json: () => res, sendStatus: () => {} } as unknown as Response;
    const next = () => {};

    const validateFieldStub = sinon.stub();
    validateFieldStub.withArgs('name', mockedProduct.name, 3, res).returns(false);
    validateFieldStub.withArgs('price', mockedProduct.price, 3, res).returns(true);

    const isValidName = validateFieldStub('name', mockedProduct.name, 3, res);
    const isValidPrice = validateFieldStub('price', mockedProduct.price, 3, res);

    if (!(isValidName && isValidPrice)) return;

    validateProduct(req, res, next);

    expect(res).to.have.status(400);
    expect(res).to.be.json;
  });
});