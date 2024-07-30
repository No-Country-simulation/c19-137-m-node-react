import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApolloPrelightMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.headers['apollo-require-preflight'] = 'true';
    next();
  }
}
