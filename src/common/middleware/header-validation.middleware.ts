// src/common/middleware/header-validation.middleware.ts
import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HeaderValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requiredHeaders = [
      'TransactionId',
      'RequestDate',
      'Source',
      'Language',
    ];

    for (const header of requiredHeaders) {
      if (!req.headers[header.toLowerCase()]) {
        throw new BadRequestException(`${header} header is missing`);
      }
    }

    next();
  }
}
