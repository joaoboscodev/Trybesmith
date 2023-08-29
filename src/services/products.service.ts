import ProductModel, { 
  ProductInputtableTypes,
  ProductSequelizeModel,
} from '../database/models/product.model';

export const createProduct = async (product: ProductInputtableTypes)
: Promise<ProductSequelizeModel> => {
  const newProduct = await ProductModel.create(product);
  return newProduct;
};

export const listProducts = async (): Promise<ProductSequelizeModel[]> => {
  const products = await ProductModel.findAll();
  return products;
};

const productsService = {
  createProduct,
  listProducts,
};
  
export default productsService;