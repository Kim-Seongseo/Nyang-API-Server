import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Injectable()
export class ExceptionInterceptor
  implements NestInterceptor<Promise<any> | string> {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Promise<any> | string>> {
    const ctx: HttpArgumentsHost = context.switchToHttp();
    const responseExpress: any = ctx.getResponse();

    return next.handle().pipe(
      map(async (response: Promise<Record<string, any> | string>) => {
        const data: Record<string, any> | string = await response;
        console.log(data);

        if (typeof data !== 'object') {
          throw new InternalServerErrorException();
        }

        responseExpress.statusCode = data.status;
        return { ...data };
      }),
    );
  }
}
