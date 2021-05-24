import {
  Controller,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/modules/auth/guard/local/local-auth.guard';
import { AuthService } from 'src/modules/auth/application/service/auth.service';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt/jwt-auth.guard';
import { Permissions } from 'src/modules/role/decorator/role.decorator';
import { ResponseService } from 'src/modules/response/application/service/response.service';
import { MemberReadRoleNameService } from 'src/modules/member/application/service/member-read-role-name.service';

@ApiTags('로그인 관리')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly memberReadRoleNameService: MemberReadRoleNameService,
    private readonly responseService: ResponseService,
  ) {}

  @ApiOperation({ summary: '로그인' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        account: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
    required: true,
  })
  @UseGuards(LocalAuthGuard)
  @Permissions()
  @Post('/login')
  async login(@Request() req) {
    try {
      const identifier = req.user['identifier'];
      const account = req.user['account'];
      const token: string = await this.authService.createAccessToken({
        identifier,
        account,
      });
      const roleName: string = await this.memberReadRoleNameService.readRoleNameByIdentifier(
        identifier,
      );

      return this.responseService.success(
        '로그인이 성공적으로 수행되었습니다.',
        HttpStatus.CREATED,
        { token, roleName },
      );
    } catch (error) {
      return this.responseService.error(error.response, error.status);
    }
  }
}
