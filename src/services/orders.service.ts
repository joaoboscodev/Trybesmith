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
    productIds: order.dataValues.productIds?.map((product) => product.id),
  }));  

  return formattedOrders;
};
interface Order {
  id: number;
}

async function createOrder(userId: number): Promise<unknown> {
  return OrderModel.create({ userId });
}

async function updateProductOrdersWithOrderId(productIds: number[], orderId: number):Promise<void> {
  const updatePromises = productIds.map((productId) =>
    ProductModel.update({ orderId }, { where: { id: productId } }));

  await Promise.all(updatePromises);
}

export const createNewOrder = async (userId: number, productIds: number[]): Promise<unknown> => {
  const newOrder = await createOrder(userId);
  await updateProductOrdersWithOrderId(productIds, (newOrder as Order).id);

  return { userId, productIds };
};

const ordersService = {
  listOrders,
  createNewOrder,
};
  
export default ordersService;