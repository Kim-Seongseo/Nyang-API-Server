import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomRequest } from 'src/modules/common/request/custom-request.interface';

export const MemberIsAdmin = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): boolean | undefined => {
    return ctx.switchToHttp().getRequest<CustomRequest>().isAdmin;
  },
);
