import { Request, Response } from 'express';
import { login } from '../services/login.service';

export const checkLoginController = async (req: Request, res: Response) => {
  const token = await login(req.body);

  if (token.status !== 200) {
    return res.status(token.status).send({ message: token.message });
  }

  return res.status(token.status).json({ token: token.message });
};

const loginController = {
  checkLoginController,
};

export default loginController;