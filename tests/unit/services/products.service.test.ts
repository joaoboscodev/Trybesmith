import chai, { expect } from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('Products service', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('if succeed creating product', async function () {
    const mockProduct = {
      name: 'Martelo de Thor',
      price: '30 peças de ouro',
      orderId: 4,
    };
    const mockResult = ProductModel.build(mockProduct);
    sinon.stub(ProductModel, 'create').resolves(mockResult);

    const response = await chai.request(app).post('/products').send(mockProduct);
    expect(response).to.have.status(201);
    
  });
});
