import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import fetch from 'node-fetch';
import { Permissions } from 'src/modules/role/decorator/role.decorator';
import { ResponseService } from 'src/modules/response/application/service/response.service';
import { Response } from 'src/modules/response/domain/response.interface';

@ApiTags('예진 관리')
@Controller('/impression')
export class ImpressionController {
  constructor(private readonly responseService: ResponseService) {}

  @ApiOperation({ summary: '예진 요청' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        content: {
          type: 'string',
        },
      },
    },
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    schema: {
      type: 'object',
      properties: {
        no: { type: 'integer' },
        title: { type: 'string' },
        question: { type: 'string' },
        answer: { type: 'string' },
        answer_ner: { type: 'string' },
        url: { type: 'string' },
        sentence_info: { type: 'string' },
      },
    },
  })
  @Permissions()
  @Post()
  async impression(@Body() query): Promise<Response | undefined> {
    const address = '/impression';
    const body = '{"content": "' + query['content'] + '"}';

    try {
      const response = await (
        await fetch(process.env.ML_API_SERVER + address, {
          method: 'POST',
          headers: {
            'Content-Type': 'appilcation/json',
          },
          body: body,
        })
      ).json();

      return this.responseService.success(
        '예진을 성공적으로 수행하였습니다.',
        HttpStatus.CREATED,
        response,
      );
    } catch (error) {
      console.log(error);
      return this.responseService.error(error.response, error.status);
    }
  }
}
