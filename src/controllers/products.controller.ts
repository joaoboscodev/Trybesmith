import { Request, Response } from 'express';
import productsService from '../services/products.service';

export const createProduct = async (req: Request, res: Response) => {
  const product = await productsService.createProduct(req.body);
  res.status(201).json(product);
};

const productsController = {
  createProduct,
};

export default productsController;