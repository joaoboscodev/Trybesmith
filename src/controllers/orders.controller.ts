import { Request, Response } from 'express';
import { listOrders, createNewOrder } from '../services/orders.service';

export const listOrdersController = async (req: Request, res: Response) => {
  const orders = await listOrders();
  res.status(200).json(orders);
};

export const createNewOrderController = async (req: Request, res: Response) => {
  const { userId, productIds } = req.body;
  const newOrder = await createNewOrder(userId, productIds);
  res.status(201).json(newOrder);
};

const ordersController = {
  listOrdersController,
  createNewOrderController,
};

export default ordersController;