import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const { JWT_SECRET = 'jwt_secret' } = process.env;

const validateAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction,
): unknown => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = authorization.split(' ')[1];

  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default validateAuthorization;