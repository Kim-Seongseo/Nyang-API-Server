import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseModule } from '../response/response.module';
import { BoardCheckIssuerService } from './application/service/board-check-issuer.service';
import { BoardCreateService } from './application/service/board-create.service';
import { BoardDeleteService } from './application/service/board-delete.service';
import { BoardDetailViewService } from './application/service/board-detail-view.service';
import { BoardHistoryService } from './application/service/board-history.service';
import { BoardSearchService } from './application/service/board-search.service';
import { BoardUpdateService } from './application/service/board-update.service';
import { BoardUtilService } from './application/service/board-util.service';
import { BoardViewService } from './application/service/board-view.service';
import { BOARD_PORT } from './domain/port/board.port';
import { FreeBoardController } from './infrastructure/api/free-board.controller';
import { InfoBoardController } from './infrastructure/api/info-board.controller';
import { BoardAdapter } from './infrastructure/persistence/board.adapter';
import { BoardQueryRepository } from './infrastructure/persistence/repository/board-query.repository';
import { BoardRepository } from './infrastructure/persistence/repository/board.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([BoardRepository]),
    TypeOrmModule.forFeature([BoardQueryRepository]),
    ResponseModule,
  ],
  controllers: [FreeBoardController, InfoBoardController],
  providers: [
    BoardCheckIssuerService,
    BoardCreateService,
    BoardDeleteService,
    BoardDetailViewService,
    BoardSearchService,
    BoardUpdateService,
    BoardUtilService,
    BoardViewService,
    BoardHistoryService,
    {
      provide: BOARD_PORT,
      useClass: BoardAdapter,
    },
  ],
})
export class BoardModule {}
