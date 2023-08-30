import { Router } from 'express';
import { createProductController, 
  listProductsController } from '../controllers/products.controller';
import validateProduct from '../middlewares/validateProduct';

const productsRoute = Router();

productsRoute.post('/products', validateProduct, createProductController);
productsRoute.get('/products', listProductsController);

export default productsRoute;