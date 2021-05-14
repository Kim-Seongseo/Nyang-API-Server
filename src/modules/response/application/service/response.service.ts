import { HttpStatus, Injectable } from '@nestjs/common';
import {
  Response,
  ResponsePaging,
} from 'src/modules/response/application/domain/response.interface';
import { MESSAGE, STATUS } from '../domain/response.constant';

@Injectable()
export class ResponseService {
  error(message: string = MESSAGE, status: HttpStatus = STATUS): Response {
    return {
      message,
      status,
    };
  }

  success(
    message: string,
    status: HttpStatus,
    data?: Record<string, any> | Record<string, any>[],
  ): Response {
    if (data) {
      return {
        message,
        status,
        data,
      };
    }
    return { message, status };
  }

  paging(
    message: string,
    status: HttpStatus,
    totalData: number,
    totalPage: number,
    currentPage: number,
    perPage: number,
    data: Record<string, any>[],
  ): ResponsePaging {
    return {
      message,
      status,
      totalData,
      totalPage,
      currentPage,
      perPage,
      data,
    };
  }
}
