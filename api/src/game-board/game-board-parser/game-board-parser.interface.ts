export interface GameBoardParser {
    parse: (board: string) => Promise<boolean[][]>;
    serialize: (board: boolean[][]) => Promise<string>;
}
