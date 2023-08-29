import { Request, Response } from 'express';
import { createProduct, listProducts } from '../services/products.service';

export const createProductController = async (req: Request, res: Response) => {
  const product = await createProduct(req.body);
  res.status(201).json(product);
};

export const listProductsController = async (req: Request, res: Response) => {
  const products = await listProducts();
  res.status(200).json(products);
};

const productsController = {
  createProductController,
  listProductsController,
};

export default productsController;