import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken} from '../utils/jwt';  // Ensure you have a function to generate a new access token
import { access } from 'src/utils/token-genretor'; 
import { sendResponse } from '../utils';
import { status, messages } from '../constants';
import axios from 'axios';
import { envConfig } from '../config';

interface AuthRequest extends Request {
  body: {
    userId?: string;
    role?: string;
  };
}

const accessToken = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendResponse(res, status.unauthorized, messages.unauthorized, null);
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyAccessToken(token) as { userId: string; role: string };
    console.log('Decoded token:', payload);
    req.body.userId = payload.userId; // Attach userId to the request object for further use
    req.body.role = payload.role;
    next();
  } catch (error: any) {
    console.log("Error is",error.name);
    if (error.name === 'TokenExpiredError') {
      // Attempt to refresh the token
      console.log(req.cookies);
      const refreshToken = req.cookies.refreshToken; // Get the refresh token from cookies
      console.log("Request Body is",req.body);
      console.log("Refresh Token is",refreshToken)
      if (!refreshToken) {
        return sendResponse(res, status.unauthorized, messages.token_expired, null);
      }

      try {
        console.log("API_BASE_URL",`${envConfig.API_BASE_URL}/v1/auth/refresh-token`);
        const response = await axios.post(`${envConfig.API_BASE_URL}/auth/refresh-token`, { refreshToken });
        console.log("Response form the refresh token",response);
        const newAccessToken = response.data.accessToken;

        // Update the Authorization header with the new access token
        req.headers.authorization = `Bearer ${newAccessToken}`;
        res.setHeader('Authorization', `Bearer ${newAccessToken}`);

        // Re-verify the new access token and proceed
        const newPayload = verifyAccessToken(newAccessToken) as { userId: string; role: string };
        req.body.userId = newPayload.userId;
        req.body.role = newPayload.role;
        next();
      } catch (refreshError) {
        return sendResponse(res, status.unauthorized, messages.invalid_token, null);
      }
    } else {
      return sendResponse(res, status.unauthorized, messages.invalid_token, null);
    }
  }
};

export default accessToken;
