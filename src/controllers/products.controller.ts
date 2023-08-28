import { Request, Response } from 'express';
import { createProduct } from '../services/products.service';

export const createProductController = async (req: Request, res: Response) => {
  const product = await createProduct(req.body);
  res.status(201).json(product);
};

const productsController = {
  createProductController,
};

export default productsController;