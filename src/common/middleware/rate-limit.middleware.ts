import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RedisService } from 'src/infrastructure/cache/redis.service';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private readonly LIMIT = 5; // limit 5 requests
  private readonly WINDOW = 60; // in 60 sec

  constructor(private readonly redisService: RedisService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip || req.connection.remoteAddress;
    const key = `rate-limit:${ip}`;

    const requestCount = await this.redisService.client
      .multi()
      .incr(key)
      .expire(key, this.WINDOW, 'NX')
      .exec();

    const currentCount = requestCount ? Number(requestCount[0][1]) : 0;

    if (currentCount > this.LIMIT) {
      throw new BadRequestException(
        'Too many requests. Please try again later.',
      );
    }

    next();
  }
}
