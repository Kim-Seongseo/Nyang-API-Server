import { HttpStatus } from '@nestjs/common';

export interface Response {
  message: string;
  status: HttpStatus;
  data?: Record<string, any> | Record<string, any>[];
}

export interface ResponsePaging extends Omit<Response, 'data'> {
  readonly totalData: number;
  readonly totalPage: number;
  readonly currentPage: number;
  readonly perPage: number;
  readonly data: Record<string, any> | Record<string, any>[];
}
