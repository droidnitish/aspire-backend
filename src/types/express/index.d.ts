// src/types/express/index.d.ts
import { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
      companyName: string;
    } & JwtPayload;
  }
}
