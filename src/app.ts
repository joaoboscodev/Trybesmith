import express from 'express';
import productsRoute from './routes/products.route';
import ordersRoute from './routes/orders.route';
import loginRoute from './routes/login.route';

const app = express();

app.use(express.json());
app.use('/', productsRoute);
app.use('/', ordersRoute);
app.use('/', loginRoute);

export default app;
