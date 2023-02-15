import { Test, TestingModule } from '@nestjs/testing';
import { GameBoardService } from './game-board.service';

describe('GameBoardService', () => {
  let service: GameBoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameBoardService],
    }).compile();

    service = module.get<GameBoardService>(GameBoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getSeq should create correct sequence', () => {
    const expected = [ 0, 1, 2 ];
    const seq = (service as any).getSeq(3);

    expect(JSON.stringify(seq)).toBe(JSON.stringify(expected));
  });

  it('should return the right surrounding coordinates', () => {
    const expected = [
      [ 1, 0 ],
      [ 0, 1 ],
      [ 1, 1 ]
    ];
    const coordinates = (service as any).getSurroundingCoordinates(0, 0, 5, 5);

    expect(JSON.stringify(coordinates)).toBe(JSON.stringify(expected));
  });

  it('should return the right surrounding coordinates', () => {
    const expected = [
      [ 3, 3 ],
      [ 4, 3 ],
      [ 3, 4 ]
    ];
    const coordinates = (service as any).getSurroundingCoordinates(4, 4, 5, 5);

    expect(JSON.stringify(coordinates)).toBe(JSON.stringify(expected));
  });

  it('should return the right surrounding coordinates', () => {
    const expected = [
      [ 3, 2 ],
      [ 4, 2 ],
      [ 3, 3 ],
      [ 3, 4 ],
      [ 4, 4 ]
    ];
    const coordinates = (service as any).getSurroundingCoordinates(4, 3, 5, 5);

    expect(JSON.stringify(coordinates)).toBe(JSON.stringify(expected));
  });

  it('should return the right amount of neighbours', () => {
    const sampleBoard = [
      [true, false, true],
      [false, false, false],
      [false, true, true]
    ];
    const neighbors = (service as any).getNeighborCount(sampleBoard, 1, 1, 3, 3);

    expect(neighbors).toBe(4);
  });

  it('should return the right amount of neighbours', () => {
    const solitude = (service as any).getUpdatedState(true, 1);
    const surviving = (service as any).getUpdatedState(true, 3);
    const overpopulated = (service as any).getUpdatedState(true, 4);

    const populated = (service as any).getUpdatedState(false, 3);
    const stillSolitude = (service as any).getUpdatedState(false, 4);

    expect(solitude).toBe(false);
    expect(surviving).toBe(true);
    expect(overpopulated).toBe(false);
    expect(populated).toBe(true);
    expect(stillSolitude).toBe(false);
  });

  it('should return the right dimensions', () => {
    const sampleBoard = [
      [true, false, true, false],
      [false, false, false, true],
      [false, true, true, false]
    ];
    const [ width, height ] = (service as any).getBoardDimensions(sampleBoard);

    expect(width).toBe(4);
    expect(height).toBe(3);
  });

});
