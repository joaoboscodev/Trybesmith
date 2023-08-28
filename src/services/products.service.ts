import ProductModel, { 
  ProductInputtableTypes,
  ProductSequelizeModel,
} from '../database/models/product.model';

export const createProduct = async (product: ProductInputtableTypes)
: Promise<ProductSequelizeModel> => {
  const newProduct = await ProductModel.create(product);
  return newProduct;
};

const productsService = {
  createProduct,
};
  
export default productsService;