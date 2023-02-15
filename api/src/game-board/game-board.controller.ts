import { Body, Controller, Patch } from '@nestjs/common';
import { GameBoardParserService } from './game-board-parser/game-board-parser.service';
import { GameBoard } from './game-board.model';
import { GameBoardService } from './game-board.service';

@Controller('api/game-board')
export class GameBoardController {

  public constructor(
    private service: GameBoardService,
    private parser: GameBoardParserService
  ) {}

  @Patch()
  public async updateGameBoard(@Body() board: GameBoard): Promise<GameBoard> {
    const parsed = await this.parser.parse(board);
    const updatedBoard = await this.service.updateGameBoard(parsed);

    return await this.parser.serialize(updatedBoard, board.type);
  }

}
