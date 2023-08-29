import { Request, Response } from 'express';
import { listOrders } from '../services/orders.service';

export const listOrdersController = async (req: Request, res: Response) => {
  const orders = await listOrders();
  res.status(200).json(orders);
};

const ordersController = {
  listOrdersController,
};

export default ordersController;