import { Component, OnInit } from '@angular/core';
import { ApiService } from '@shared/api';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  private sub: Subscription;

  private basePattern = [
    [ true, false, true, false, false, false, true ],
    [ false, false, false, false, true, true, true ],
    [ true, false, true, false, false, false, true ],
    [ false, false, false, false, true, true, true ],
    [ true, false, true, false, false, false, true ],
    [ false, false, false, false, true, true, true ],
    [ true, false, true, false, false, false, true ],
    [ false, false, false, false, true, true, true ],
    [ true, false, true, false, false, false, true ],
    [ false, false, false, false, true, true, true ],
  ];

  private currentBoard: boolean[][] = [];
  public currentVisu: [string, string][] = [];

  private running = false;

  constructor(
    private api: ApiService
  ) { }

  public ngOnInit(): void {
    this.reset();
  }

  public startStop(): void {
    if (this.sub?.closed == false) {
      this.sub.unsubscribe();
      return;
    }

    this.sub = timer(0, 200).pipe(
      switchMap(t => this.api.updateBoard(this.currentBoard))
    ).subscribe(b => {
      this.currentBoard = b;
      this.updateVisu(b);
    })
  }

  public reset(): void {
    const pattern = '         \n         \n         \n   XXX   \n   X X   \n   XXX   \n         \n         \n         ';
    const parsed = this.basePattern; // this.parse(pattern);

    this.sub?.unsubscribe();

    this.currentBoard = parsed;
    this.updateVisu(this.currentBoard);
  }

  private updateVisu(board: boolean[][]): void {
    const coordinates = [];

    for (const rowIdx of Array.from({length: board.length}, (p, k) => k)) {
      for (const cellIdx of Array.from({length: board[rowIdx].length}, (p, k) => k)) {

        if (!board[rowIdx][cellIdx]) { continue; }
      
        coordinates.push([ cellIdx * 20 + 'px', rowIdx * 20 + 'px' ]);

      }
    }

    this.currentVisu = coordinates;
  }

  public parse(board: string): boolean[][] {
    const rows = board.split('\n');
    return rows.map(r => r.split('').map(c => c === ' ' ? false : true));
  }
}
