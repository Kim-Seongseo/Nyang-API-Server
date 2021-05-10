import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomRequest } from 'src/modules/common/request/custom-request.interface';

export const Member = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest<CustomRequest>().account;
  },
);
