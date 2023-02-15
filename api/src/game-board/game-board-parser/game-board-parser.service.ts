import { BadRequestException, Injectable } from "@nestjs/common";
import { GameBoard } from "../game-board.model";
import { GameBoardType } from "../game-board.type";
import { GameBoardParser } from "./game-board-parser.interface";
import { SimpleGameBoardParserService } from "./simple-game-board-parser.service";

@Injectable()
export class GameBoardParserService {

    private readonly parsers: Map<GameBoardType, GameBoardParser>;
    
    public constructor(
        simpleParser: SimpleGameBoardParserService
    ) {
        this.parsers = new Map<GameBoardType, GameBoardParser>([
            [ 'simple', simpleParser ]
        ]);
    }

    private getParserForType(type: GameBoardType): GameBoardParser {
        if (!this.parsers.has(type)) {
            throw new BadRequestException('Not supported game board type');
        }

        return this.parsers.get(type);
    }
    
    public async parse(board: GameBoard): Promise<boolean[][]> {
        const parser = this.getParserForType(board.type);
        return await parser.parse(board.data);
    }
    
    public async serialize(board: boolean[][], type: GameBoardType): Promise<GameBoard> {
        const parser = this.getParserForType(type);
        const data = await parser.serialize(board);

        return { data, type };
    }

}