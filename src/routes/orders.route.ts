import { Router } from 'express';
import { listOrdersController, createNewOrderController } from '../controllers/orders.controller';
import validateAuthorization from '../middlewares/validateAuthorization';
import validateNewOrder from '../middlewares/validateNewOrder';

const ordersRoute = Router();

ordersRoute.get('/orders', listOrdersController);
ordersRoute.post(
  '/orders', 
  validateAuthorization,
  validateNewOrder,
  createNewOrderController,
);

export default ordersRoute;