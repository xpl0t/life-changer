import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class GameBoardService {

    public async updateGameBoard(board: boolean[][]): Promise<boolean[][]> {
        const [ width, height ] = this.getBoardDimensions(board);
        const updated: boolean[][] = [];

        for (const rowIdx of this.getSeq(board.length)) {
            const row = board[rowIdx];

            updated.push([]);

            for (const cellIdx of this.getSeq(row.length)) {
                const cell = row[cellIdx];

                const neighborCount = this.getNeighborCount(board, cellIdx, rowIdx, width, height);
                const newState = this.getUpdatedState(cell, neighborCount);

                updated[rowIdx].push(newState);
            }
        }

        return updated;
    }

    private getSeq(length: number): number[] {
        return Array.from({ length }, (v, k) => k);
    }

    private getBoardDimensions(board: boolean[][]): [ number, number ] {
        // TODO: More checks on the board.
        if (board.length < 1) {
            throw new BadRequestException('Invalid board');
        }

        return [ board[0].length, board.length ];
    }

    private getNeighborCount(board: boolean[][], x: number, y: number, width: number, height: number): number {
        const surrounding = this.getSurroundingCoordinates(x, y, width, height);
        return surrounding.map(([x, y]) => board[y][x] ? 1 : 0).reduce((p, c) => p + c, 0);
    }

    private getSurroundingCoordinates(x: number, y: number, width: number, height: number): [ number, number ][] {
        const coordinates: [ number, number ][] = [];
        const xOff = x - 1;
        const yOff = y - 1;

        for (const yMod of this.getSeq(3)) {
            const yCur = yMod + yOff;

            if (yCur < 0 || yCur >= height) {
                continue;
            }

            for (const xMod of this.getSeq(3)) {
                const xCur = xMod + xOff;

                if (xCur === x && yCur === y) {
                    continue;
                }

                if (xCur < 0 || xCur >= width) {
                    continue;
                }

                coordinates.push([ xCur, yCur ]);
            }
        }

        return coordinates;
    }

    private getUpdatedState(state: boolean, neighbours: number): boolean {
        if (!state) {
            return neighbours === 3 ? true : false;
        }

        return neighbours < 2 || neighbours > 3 ? false : true;
    }

}
