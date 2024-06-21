import { Request, Response, NextFunction } from 'express';

type AsyncRouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const catchAsync = (fn: AsyncRouteHandler) => (req: Request, res: Response, next: NextFunction): void => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default catchAsync;
