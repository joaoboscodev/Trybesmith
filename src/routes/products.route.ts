import { Router } from 'express';
import { createProductController, 
  listProductsController } from '../controllers/products.controller';

const productsRoute = Router();

productsRoute.post('/products', createProductController);
productsRoute.get('/products', listProductsController);

export default productsRoute;