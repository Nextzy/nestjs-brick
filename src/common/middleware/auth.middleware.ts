import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Request, Response, NextFunction } from 'express';
  import * as jwt from 'jsonwebtoken';
  
  @Injectable()
  export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
      const authHeader = req.headers['authorization'];
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Missing or invalid token');
      }
  
      const token = authHeader.split(' ')[1];
      const secretKey = process.env.JWT_SECRET || 'secret-key';
  
      try {
        const decoded = jwt.verify(token, secretKey);
        req['user'] = decoded;
        next();
      } catch (error) {
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  }
  