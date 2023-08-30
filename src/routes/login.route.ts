import { Router } from 'express';
import { checkLoginController } from '../controllers/login.controller';

const loginRoute = Router();

loginRoute.post('/login', checkLoginController);

export default loginRoute;