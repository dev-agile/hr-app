import { Request, Response, NextFunction } from 'express';
import CustomError from './custom-error-handler';

const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const data = err.data || null;

    // Log the error
    console.error(`[ERROR] ${statusCode} - ${message}`);

    // Send error response
    res.status(statusCode).json({
        message,
        data
    });
};

export default errorHandler;
