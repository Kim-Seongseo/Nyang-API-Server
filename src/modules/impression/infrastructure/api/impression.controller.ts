import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { json } from 'express';
import { Public } from 'src/modules/auth/decorator/skip-auth.decorator';
import * as fetch from 'node-fetch';

@ApiTags('예진 관리')
@Controller('/impression')
export class ImpressionController {
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
  @Public()
  @Post()
  async impression(@Body() query): Promise<any | undefined> {
    const address = '/impression';
    const body = '{"content": "' + query['content'] + '"}';

    const response = (
      await fetch(process.env.ML_API_SERVER + address, {
        method: 'POST',
        headers: {
          'Content-Type': 'appilcation/json',
        },
        body: body,
      })
    ).json();
    return response;
  }
}
