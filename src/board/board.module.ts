import { Module } from '@nestjs/common';
import { BoardController } from './infra/api/board.controller';
import { BoardService } from './domain/service/board.service';

@Module({
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
