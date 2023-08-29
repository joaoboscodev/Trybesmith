import express from 'express';
import productsRoute from './routes/products.route';
import ordersRoute from './routes/orders.route';

const app = express();

app.use(express.json());
app.use('/', productsRoute);
app.use('/', ordersRoute);

export default app;
