import { Router } from 'express';
import { listOrdersController } from '../controllers/orders.controller';

const ordersRoute = Router();

ordersRoute.get('/orders', listOrdersController);

export default ordersRoute;