import { Router } from 'express';
import { createProduct } from '../controllers/products.controller';

const productsRoute = Router();

productsRoute.post('/products', createProduct);

export default productsRoute;