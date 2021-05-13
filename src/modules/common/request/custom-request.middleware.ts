import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CustomRequest } from './custom-request.interface';

export function customRequestMiddleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) {
  const customReq: CustomRequest = (req as any) as CustomRequest;
  customReq.account = -1;
  customReq.isAdmin = false;
  next();
}
