import { Request } from 'express';

export interface CustomRequest extends Request {
  account: number;
  isAdmin: boolean;
}
