import { BadRequestException, Injectable } from "@nestjs/common";
import { GameBoardParser } from "./game-board-parser.interface";

@Injectable()
export class SimpleGameBoardParserService implements GameBoardParser {

    public async parse(board: string): Promise<boolean[][]> {
        const rows = board.split('\n');
        const parsed = rows.map(r => r.split('').map(c => c === ' ' ? false : true));

        this.checkDimensions(parsed);
        return parsed;
    }

    public async serialize(board: boolean[][]): Promise<string> {
        return board.map(r => this.serializeRow(r)).join('\n');
    }

    /** Throws error, if the game board dimensions ar invalid. */
    private checkDimensions(board: boolean[][]): void {
        // Check height
        if (board.length < 3 || board.length > 1000) {
            throw new BadRequestException('Game board has an invalid height');
        }

        // Check width
        let width = null;

        for (const row of board) {
            if (row.length < 3 || row.length > 1000) {
                throw new BadRequestException('Game board has an invalid width');
            }

            if (width !== null && row.length !== width) {
                throw new BadRequestException('Game board has inconsitent widths');
            }

            width = row.length;
        }
    }

    private serializeRow(row: boolean[]): string {
        return row.map(cell => cell ? 'X' : ' ').join('');
    }

}