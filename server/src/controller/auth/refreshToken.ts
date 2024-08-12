import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { access } from 'src/utils/token-genretor';
import { verifyAccessToken } from 'src/utils/jwt';

export const refreshToken = async (req:Request, res:Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ error: 'Access denied' });

  try {
    const newPayload = verifyAccessToken(refreshToken) as { userId: string; role: string };
    const newAccessToken = access(newPayload.userId, newPayload.role);
    console.log("Access token",newAccessToken);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};
