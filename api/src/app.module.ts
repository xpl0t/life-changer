import { Module } from '@nestjs/common';
import { GameBoardModule } from './game-board/game-board.module';

@Module({
  imports: [GameBoardModule]
})
export class AppModule {}
