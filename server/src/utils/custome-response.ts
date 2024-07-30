import { Response } from 'express';
function sendResponse(
  res: Response,
  statusCode: number,
  message: any,
  data: any,
): void {
  res.status(statusCode).json({
    message: message,
    data: data,
  });
}

export default sendResponse;
