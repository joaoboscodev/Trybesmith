import { Router } from 'express';
import { createProductController } from '../controllers/products.controller';

const productsRoute = Router();

productsRoute.post('/products', createProductController);

export default productsRoute;