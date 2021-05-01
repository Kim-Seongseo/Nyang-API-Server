import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/modules/auth/decorator/skip-auth.decorator';

@ApiTags('예진 관리')
@Controller('/impression')
export class ImpressionController {
  @ApiOperation({ summary: '예진 요청' })
  @Public()
  @Post()
  async impression(@Body() query): Promise<any | undefined> {
    const address = '/api/impression';
    const response = (
      await fetch(process.env.ML_API_SERVER + address, {
        method: 'POST',
        headers: {
          'Content-Type': 'appilcation/json',
        },
        body: query,
      })
    ).json();
    return response;
  }
}
