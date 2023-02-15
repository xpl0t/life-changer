import { Module } from '@nestjs/common';
import { GameBoardParserService } from './game-board-parser.service';
import { SimpleGameBoardParserService } from './simple-game-board-parser.service';

@Module({
  providers: [
    GameBoardParserService,
    SimpleGameBoardParserService
  ],
  exports: [
    GameBoardParserService
  ]
})
export class GameBoardParserModule {}
