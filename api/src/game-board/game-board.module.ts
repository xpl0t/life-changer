import { Module } from '@nestjs/common';
import { GameBoardParserModule } from './game-board-parser/game-board.module';
import { GameBoardController } from './game-board.controller';
import { GameBoardService } from './game-board.service';

@Module({
  imports: [GameBoardParserModule],
  providers: [GameBoardService],
  controllers: [GameBoardController]
})
export class GameBoardModule {}
