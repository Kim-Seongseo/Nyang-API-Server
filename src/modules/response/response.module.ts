import { Module } from '@nestjs/common';
import { ResponseService } from './application/service/response.service';

@Module({
  providers: [ResponseService],
  exports: [ResponseService],
})
export class ResponseModule {}
