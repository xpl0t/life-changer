import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiService {

  public constructor(
    private http: HttpClient
  ) {}

  public updateBoard(board: boolean[][]): Observable<boolean[][]> {
    const serialized = this.serialize(board);

    return this.http.patch('http://localhost:3000/api/game-board', {
      data: serialized,
      type: 'simple'
    }).pipe(
      map((d: any) => this.parse(d.data))
    );
  }

  public parse(board: string): boolean[][] {
    const rows = board.split('\n');
    return rows.map(r => r.split('').map(c => c === ' ' ? false : true));
  }

  public serialize(board: boolean[][]): string {
      return board.map(r => this.serializeRow(r)).join('\n');
  }

  private serializeRow(row: boolean[]): string {
      return row.map(cell => cell ? 'X' : ' ').join('');
  }

}
