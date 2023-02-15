import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameBoardComponent } from './game-board.component';
import { ApiModule } from '@shared/api';

@NgModule({
  declarations: [
    GameBoardComponent
  ],
  imports: [
    CommonModule,
    ApiModule
  ],
  exports: [
    GameBoardComponent
  ]
})
export class GameBoardModule { }
