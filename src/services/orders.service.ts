import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';

export const listOrders = async (): Promise<unknown[]> => {
  const orders = await OrderModel.findAll({
    include: [
      {
        model: ProductModel,
        as: 'productIds',
        attributes: ['id'],
      },
    ],
  });

  const formattedOrders = orders.map((order) => ({
    id: order.dataValues.id,
    userId: order.dataValues.userId,
    productIds: order.dataValues.productIds?.map((product) => product.id) || [],
  }));  

  return formattedOrders;
};

const productsService = {
  listOrders,
};
  
export default productsService;