import { IUser } from '@model'; // Adjust the import based on your project structure

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      userId: string;
      role: string;
    };
  }
}