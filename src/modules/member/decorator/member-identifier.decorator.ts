import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomRequest } from 'src/modules/common/request/custom-request.interface';

export const MemberIdentifier = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): number | undefined => {
    return ctx.switchToHttp().getRequest<CustomRequest>().account;
  },
);
