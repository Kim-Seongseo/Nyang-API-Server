import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Inject,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseService } from 'src/modules/response/application/service/response.service';
import { Response } from 'src/modules/response/domain/response.interface';
import { RoleMemberMappingFindResDto } from '../../application/dto/role-member-mapping-find.dto';
import { RoleMemberMappingUpdateReqDto } from '../../application/dto/role-member-mapping-update.dto';
import { RoleMemberMappingSearchService } from '../../application/service/role-member-mapping/role-member-mapping-search.service';
import { RoleMemberMappingUpdateService } from '../../application/service/role-member-mapping/role-member-mapping-update.service';
import { RoleMemberMappingUtilService } from '../../application/service/role-member-mapping/role-member-mapping-util.service';
import { RoleMemberMappingViewService } from '../../application/service/role-member-mapping/role-member-mapping-view.service';
import { Permissions } from '../../decorator/role.decorator';
import { PAGE, PER_PAGE } from '../../domain/constant/pagination.constant';
import { ROLE_MEMBER_MAPPING_PORT } from '../../domain/port/port.constant';
import { RoleMemberMappingPort } from '../../domain/port/role-member-mapping.port';
import { PermissionType } from '../../domain/type/permission-type.enum';

@ApiTags('회원별 권한 관리')
@Controller('role_member')
export class RoleMemberMappingController {
  constructor(
    @Inject(ROLE_MEMBER_MAPPING_PORT)
    private readonly roleMemberMappingPort: RoleMemberMappingPort,
    private readonly roleMemberMappingUpdateService: RoleMemberMappingUpdateService,
    private readonly roleMemberMappingSearchService: RoleMemberMappingSearchService,
    private readonly roleMemberMappingViewService: RoleMemberMappingViewService,
    private readonly roleMemberMappingUtilService: RoleMemberMappingUtilService,
    private readonly responseService: ResponseService,
  ) {}

  @ApiOperation({ summary: '권한정보 조회' })
  @ApiQuery({
    name: 'page',
    type: 'string',
    required: true,
  })
  @ApiQuery({
    name: 'perPage',
    type: 'string',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    type: [RoleMemberMappingFindResDto],
  })
  @ApiBearerAuth('token')
  @Permissions(PermissionType.MEMBER_MANAGE)
  @Get('/')
  async findRoles(
    @Query('page', new DefaultValuePipe(PAGE), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(PER_PAGE), ParseIntPipe)
    perPage: number,
  ) {
    try {
      const skippedItems: number = await this.roleMemberMappingUtilService.skip(
        page,
        perPage,
      );
      const questions: RoleMemberMappingFindResDto[] = await this.roleMemberMappingViewService.view(
        skippedItems,
        perPage,
      );

      const totalData = await this.roleMemberMappingUtilService.totalData();
      const totalPage = await this.roleMemberMappingUtilService.totalPage(
        totalData,
        perPage,
      );
      return this.responseService.paging(
        '회원별 권한목록이 성공적으로 조회되었습니다.',
        HttpStatus.OK,
        totalData,
        totalPage,
        page,
        perPage,
        questions,
      );
    } catch (error) {
      console.log(error);
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '권한정보 검색' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        keyword: {
          type: 'string',
        },
      },
    },
    required: true,
  })
  @ApiQuery({
    name: 'page',
    type: 'string',
    required: true,
  })
  @ApiQuery({
    name: 'perPage',
    type: 'string',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    type: [RoleMemberMappingFindResDto],
  })
  @ApiBearerAuth('token')
  @Permissions(PermissionType.MEMBER_MANAGE)
  @Post('/search')
  async searchRoles(
    @Body('keyword') keyword: string,
    @Query('page', new DefaultValuePipe(PAGE), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(PER_PAGE), ParseIntPipe)
    perPage: number,
  ) {
    try {
      const skippedItems: number = await this.roleMemberMappingUtilService.skip(
        page,
        perPage,
      );
      const questions: RoleMemberMappingFindResDto[] = await this.roleMemberMappingSearchService.search(
        skippedItems,
        perPage,
        keyword,
      );

      const totalData = await this.roleMemberMappingUtilService.totalData();
      const totalPage = await this.roleMemberMappingUtilService.totalPage(
        totalData,
        perPage,
      );
      return this.responseService.paging(
        '회원별 권한목록이 성공적으로 검색되었습니다.',
        HttpStatus.OK,
        totalData,
        totalPage,
        page,
        perPage,
        questions,
      );
    } catch (error) {
      console.log(error);
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '권한정보 갱신' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    schema: { type: 'object', properties: { identifier: { type: 'string' } } },
  })
  @ApiBearerAuth('token')
  @Permissions(PermissionType.MEMBER_MANAGE)
  @Put('/')
  async updateRole(
    @Body() roleMemberMappingUpdateReqDto: RoleMemberMappingUpdateReqDto,
  ): Promise<Response | undefined> {
    try {
      const roleMemberMappingIdentifier: string = (
        await this.roleMemberMappingUpdateService.update(
          roleMemberMappingUpdateReqDto,
        )
      ).toString();
      return this.responseService.success(
        '질문이 성공적으로 수정되었습니다.',
        HttpStatus.OK,
        { roleMemberMappingIdentifier },
      );
    } catch (error) {
      console.log(error);
      return this.responseService.error(error.response, error.status);
    }
  }
}
