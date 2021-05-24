import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MemberIdentifier } from 'src/modules/member/decorator/member-identifier.decorator';
import { MemberIsAdmin } from 'src/modules/member/decorator/member-isAdmin.decorator';
import { ResponseService } from 'src/modules/response/application/service/response.service';
import { Response } from 'src/modules/response/domain/response.interface';
import { Permissions } from 'src/modules/role/decorator/role.decorator';
import { PermissionType } from 'src/modules/role/domain/type/permission-type.enum';
import { BoardCreateReqDto } from '../../application/dto/board-create.dto';
import { BoardDetailViewResDto } from '../../application/dto/board-detail.dto';
import { BoardSearchReqDto } from '../../application/dto/board-search.dto';
import { BoardUpdateReqDto } from '../../application/dto/board-update.dto';
import { BoardViewResDto } from '../../application/dto/board-view.dto';
import { NotAIssuerException } from '../../application/exception/not-a-issuer.exception';
import { BoardCheckIssuerService } from '../../application/service/board-check-issuer.service';
import { BoardCreateService } from '../../application/service/board-create.service';
import { BoardDeleteService } from '../../application/service/board-delete.service';
import { BoardDetailViewService } from '../../application/service/board-detail-view.service';
import { BoardUpdateService } from '../../application/service/board-update.service';
import { BoardUtilService } from '../../application/service/board-util.service';
import { BoardViewService } from '../../application/service/board-view.service';
import { PAGE, PER_PAGE } from '../../domain/constant/pagination.constant';
import { BoardSearchService } from '../../application/service/board-search.service';
import { BoardType } from '../../domain/type/board.type';

@ApiTags('정보게시판 관리')
@Controller('info')
export class InfoBoardController {
  constructor(
    private readonly responseService: ResponseService,
    private readonly boardCreateService: BoardCreateService,
    private readonly boardDeleteService: BoardDeleteService,
    private readonly boardUpdateService: BoardUpdateService,
    private readonly boardDetailViewService: BoardDetailViewService,
    private readonly boardViewService: BoardViewService,
    private readonly boardUtilService: BoardUtilService,
    private readonly boardCheckIssuerService: BoardCheckIssuerService,
    private readonly boardSearchService: BoardSearchService,
  ) {}

  @ApiOperation({ summary: '지식정보 등록' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    schema: { type: 'object', properties: { identifier: { type: 'string' } } },
  })
  @ApiBearerAuth('token')
  @Permissions(PermissionType.BOARD_MANAGE, PermissionType.BOARD_INFO_PUBLISH)
  @Post('/')
  async registerQuestion(
    @MemberIdentifier() memberIdentifier: number,
    @Body() boardCreateReqDto: BoardCreateReqDto,
  ): Promise<Response | undefined> {
    try {
      const boardIdentifier: string = (
        await this.boardCreateService.create(
          memberIdentifier,
          boardCreateReqDto,
          BoardType.FREE_BOARD,
        )
      ).toString();
      return this.responseService.success(
        '지식정보를 정상적으로 등록했습니다',
        HttpStatus.CREATED,
        { boardIdentifier },
      );
    } catch (error) {
      console.log(error);
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '지식정보 수정' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    schema: { type: 'object', properties: { identifier: { type: 'string' } } },
  })
  @ApiBearerAuth('token')
  @Permissions(PermissionType.BOARD_MANAGE, PermissionType.BOARD_INFO_PUBLISH)
  @Put('/:identifier')
  async updateQuestion(
    @Param('identifier') identifier: number,
    @MemberIdentifier() memberIdentifier: number,
    @MemberIsAdmin() memberIsAdmin: boolean,
    @Body() boardUpdateReqDto: BoardUpdateReqDto,
  ): Promise<Response | undefined> {
    try {
      if (
        !this.boardCheckIssuerService.isIssuer(
          memberIdentifier,
          memberIsAdmin,
          identifier,
        )
      ) {
        throw new NotAIssuerException();
      }

      const boardIdentifier: string = (
        await this.boardUpdateService.update(identifier, boardUpdateReqDto)
      ).toString();
      return this.responseService.success(
        '지식정보가 성공적으로 수정되었습니다.',
        HttpStatus.OK,
        { boardIdentifier },
      );
    } catch (error) {
      console.log(error);
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '지식정보 삭제' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    schema: { type: 'object', properties: { identifier: { type: 'string' } } },
  })
  @ApiBearerAuth('token')
  @Permissions(PermissionType.BOARD_MANAGE, PermissionType.BOARD_INFO_PUBLISH)
  @Delete('/:identifier')
  async deleteQuestion(
    @MemberIdentifier() memberIdentifier: number,
    @MemberIsAdmin() memberIsAdmin: boolean,
    @Param('identifier') identifier: number,
  ): Promise<any | undefined> {
    try {
      if (
        !this.boardCheckIssuerService.isIssuer(
          memberIdentifier,
          memberIsAdmin,
          identifier,
        )
      ) {
        throw new NotAIssuerException();
      }

      const boardIdentifier: string = (
        await this.boardDeleteService.delete(identifier)
      ).toString();
      return this.responseService.success(
        '지식정보가 성공적으로 삭제되었습니다.',
        HttpStatus.OK,
        { boardIdentifier },
      );
    } catch (error) {
      console.log(error);
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '지식정보 조회' })
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
    type: [BoardViewResDto],
  })
  @Permissions()
  @Get('/')
  async viewQuestion(
    @Query('page', new DefaultValuePipe(PAGE), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(PER_PAGE), ParseIntPipe)
    perPage: number,
  ): Promise<Response | undefined> {
    try {
      //   // 현재 페이지: page
      //   // 페이지당 게시물 수 : perPage
      //   // 페이지 내 게시물: questions
      //   // 총 게시물 수: totalData
      //   // 총 페이지 수: totalPage
      const skippedItems: number = await this.boardUtilService.skip(
        page,
        perPage,
      );
      const boards: BoardViewResDto[] = await this.boardViewService.paginatedView(
        perPage,
        skippedItems,
        BoardType.FREE_BOARD,
      );
      const totalData: number = await this.boardUtilService.totalData(
        BoardType.FREE_BOARD,
      );
      const totalPage = await this.boardUtilService.totalPage(
        totalData,
        perPage,
      );
      return this.responseService.paging(
        '지식정보를 성공적으로 조회하였습니다.',
        HttpStatus.OK,
        totalData,
        totalPage,
        page,
        perPage,
        boards,
      );
    } catch (error) {
      console.log(error);
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '지식정보 상세 조회' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    type: [BoardDetailViewResDto],
  })
  @ApiBearerAuth('token')
  @Permissions(PermissionType.OPTION, PermissionType.BOARD_MANAGE)
  @Get('/:identifier')
  async viewDetail(
    @MemberIdentifier() memberIdentifier: number,
    @MemberIsAdmin() memberIsAdmin: boolean,
    @Param('identifier') identifier: number,
  ): Promise<Response | undefined> {
    try {
      const boardDetail: BoardDetailViewResDto = await this.boardDetailViewService.detailView(
        memberIdentifier,
        memberIsAdmin,
        identifier,
        BoardType.FREE_BOARD,
      );

      return this.responseService.success(
        '지식정보를 성공적으로 조회했습니다.',
        HttpStatus.OK,
        boardDetail,
      );
    } catch (error) {
      console.log(error);
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '지식정보 검색' })
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
    type: [BoardViewResDto],
  })
  @Permissions()
  @Post('/search')
  async searchQuestion(
    @Body() boardSearchReqDto: BoardSearchReqDto,
    @Query('page', new DefaultValuePipe(PAGE), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(PER_PAGE), ParseIntPipe)
    perPage: number,
  ): Promise<any | undefined> {
    try {
      const skippedItems: number = await this.boardUtilService.skip(
        page,
        perPage,
      );
      const boards: BoardViewResDto[] = await this.boardSearchService.searchBoard(
        skippedItems,
        perPage,
        boardSearchReqDto.keyword,
        BoardType.FREE_BOARD,
      );

      const totalData = await this.boardUtilService.totalData(
        BoardType.FREE_BOARD,
      );
      const totalPage = await this.boardUtilService.totalPage(
        totalData,
        perPage,
      );
      return this.responseService.paging(
        '지식정보가 성공적으로 검색되었습니다.',
        HttpStatus.OK,
        totalData,
        totalPage,
        page,
        perPage,
        boards,
      );
    } catch (error) {
      console.log(error);
      return this.responseService.error(error.response, error.status);
    }
  }
}
