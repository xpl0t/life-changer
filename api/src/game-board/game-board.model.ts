import { GameBoardType } from "./game-board.type";

export interface GameBoard {
    data: string;

    /** Defines the data structure in data. */
    type: GameBoardType;
}
