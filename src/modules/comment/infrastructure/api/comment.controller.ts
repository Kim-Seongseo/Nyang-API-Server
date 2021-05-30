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
import { ResponseService } from 'src/modules/response/application/service/response.service';
import { Response } from 'src/modules/response/domain/response.interface';
import { Permissions } from 'src/modules/role/decorator/role.decorator';
import { PermissionType } from 'src/modules/role/domain/type/permission-type.enum';
import { CommentCreateReqDto } from '../../application/dto/comment-create.dto';
import { CommentViewResDto } from '../../application/dto/comment-view.dto';
import { CommentUpdateReqDto } from '../../application/dto/comment-update.dto';
import { CommentCreateService } from '../../application/service/comment-create.service';
import { CommentDeleteService } from '../../application/service/comment-delete.service';
import { CommentViewService } from '../../application/service/comment-view.service';
import { CommentUpdateService } from '../../application/service/comment-update.service';
import { CommentHistoryResDto } from '../../application/dto/commnet-history.dto';
import {
  PAGE,
  PER_PAGE,
} from 'src/modules/board/domain/constant/pagination.constant';
import { CommentUtilService } from '../../application/service/comment-util.service';
import { CommentHistoryService } from '../../application/service/comment-history.service';

@ApiTags('댓글 관리')
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentCreateService: CommentCreateService,
    private readonly commentUpdateService: CommentUpdateService,
    private readonly commentDeleteService: CommentDeleteService,
    private readonly commentViewService: CommentViewService,
    private readonly commentUtilService: CommentUtilService,
    private readonly commentHistoryService: CommentHistoryService,
    private readonly responseService: ResponseService,
  ) {}

  @ApiOperation({ summary: '댓글 등록' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    schema: { type: 'object', properties: { identifier: { type: 'string' } } },
  })
  @ApiBearerAuth('token')
  @Permissions(PermissionType.COMMENT_ACCESS, PermissionType.COMMNET_MANAGE)
  @Post('/')
  async createComment(
    @MemberIdentifier() memberIdentifier: number,
    @Body() commentCreateReqDto: CommentCreateReqDto,
  ) {
    try {
      const commentIdentifier: string = (
        await this.commentCreateService.create(
          memberIdentifier,
          commentCreateReqDto,
        )
      ).toString();

      return this.responseService.success(
        '댓글이 성공적으로 등록되었습니다.',
        HttpStatus.CREATED,
        { commentIdentifier },
      );
    } catch (error) {
      console.log(error);
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '댓글 수정' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
    schema: { type: 'object', properties: { identifier: { type: 'string' } } },
  })
  @ApiBearerAuth('token')
  @Permissions(PermissionType.COMMENT_ACCESS, PermissionType.COMMNET_MANAGE)
  @Put('/:commentIdentifier')
  async updateComment(
    @Param('commentIdentifier') identifier: number,
    @MemberIdentifier() memberIdentifier: number,
    @Body() commentUpdateReqDto: CommentUpdateReqDto,
  ) {
    try {
      const commentIdentifier: string = (
        await this.commentUpdateService.update(
          identifier,
          memberIdentifier,
          commentUpdateReqDto,
        )
      ).toString();

      return this.responseService.success(
        '댓글이 성공적으로 수정되었습니다.',
        HttpStatus.OK,
        { commentIdentifier },
      );
    } catch (error) {
      console.log(error);
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '댓글 삭제' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
    schema: { type: 'object', properties: { identifier: { type: 'string' } } },
  })
  @ApiBearerAuth('token')
  @Permissions(PermissionType.COMMENT_ACCESS, PermissionType.COMMNET_MANAGE)
  @Delete('/:commentIdentifier')
  async deleteComment(
    @Param('commentIdentifier') identifier: number,
    @MemberIdentifier() memberIdentifier: number,
  ): Promise<Response | undefined> {
    try {
      const commentIdentifier: string = (
        await this.commentDeleteService.delete(identifier, memberIdentifier)
      ).toString();

      return this.responseService.success(
        '댓글을 성공적으로 삭제했습니다.',
        HttpStatus.OK,
        { commentIdentifier },
      );
    } catch (error) {
      console.log(error);
      return this.responseService.error(error.response, error.status);
    }
  }

  @ApiOperation({ summary: '회원별 댓글 기록 조회' })
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
    type: [CommentHistoryResDto],
  })
  @ApiBearerAuth('token')
  @Permissions(PermissionType.COMMENT_ACCESS, PermissionType.COMMNET_MANAGE)
  @Get('/history')
  async viewFreeBoardHistory(
    @MemberIdentifier() memberIdentifier: number,
    @Query('page', new DefaultValuePipe(PAGE), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(PER_PAGE), ParseIntPipe)
    perPage: number,
  ): Promise<Response | undefined> {
    try {
      const skippedItems: number = await this.commentUtilService.skip(
        page,
        perPage,
      );
      const boards: CommentHistoryResDto[] = await this.commentHistoryService.history(
        memberIdentifier,
        perPage,
        skippedItems,
      );

      const totalData: number = await this.commentUtilService.totalDataPerMember(
        memberIdentifier,
      );

      const totalPage = await this.commentUtilService.totalPage(
        totalData,
        perPage,
      );

      return this.responseService.paging(
        '게시물 기록을 성공적으로 조회하였습니다.',
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

  @ApiOperation({ summary: '댓글 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
    type: [CommentViewResDto],
  })
  @ApiBearerAuth('token')
  @Permissions(PermissionType.OPTION)
  @Get('/:postIdentifier')
  async viewComment(
    @Param('postIdentifier') postIdentifier: number,
    @MemberIdentifier() memberIdentifier: number,
  ): Promise<Response | undefined> {
    try {
      const comments: CommentViewResDto[] = await this.commentViewService.view(
        memberIdentifier,
        postIdentifier,
      );

      return this.responseService.success(
        '댓글을 성공적으로 조회했습니다.',
        HttpStatus.OK,
        comments,
      );
    } catch (error) {
      console.log(error);
      return this.responseService.error(error.response, error.status);
    }
  }
}
