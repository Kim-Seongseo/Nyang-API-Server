import { Module } from '@nestjs/common';
import { BoardController } from 'src/modules/board/infrastructure/api/board.controller';
import { BoardService } from 'src/modules/board/application/service/board.service';

@Module({
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
