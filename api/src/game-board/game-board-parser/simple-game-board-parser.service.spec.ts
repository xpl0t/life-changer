import { Test, TestingModule } from '@nestjs/testing';
import { SimpleGameBoardParserService } from './simple-game-board-parser.service';

describe('SimpleGameBoardParserService', () => {
  let service: SimpleGameBoardParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimpleGameBoardParserService],
    }).compile();

    service = module.get<SimpleGameBoardParserService>(SimpleGameBoardParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should parse correctly', async () => {
    const sampleBoard = ' X \n   \nXXX';
    const out = await service.parse(sampleBoard);

    expect(out[0][1]).toBe(true);
    expect(out[1][1]).toBe(false);
    expect(out[2][1]).toBe(true);
  });

  it('should serialize correctly', async () => {
    const sampleBoard = [
      [true, false, true],
      [false, false, false],
      [false, true, true]
    ];
    const expectedOutput = 'X X\n   \n XX';
    const out = await service.serialize(sampleBoard);

    expect(out).toBe(expectedOutput);
  });

});
