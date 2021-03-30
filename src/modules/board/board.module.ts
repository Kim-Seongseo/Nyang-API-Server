import { Module } from '@nestjs/common';
import { BoardController } from 'src/modules/board/infra/api/board.controller';
import { BoardService } from 'src/modules/board/domain/service/board.service';

@Module({
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
