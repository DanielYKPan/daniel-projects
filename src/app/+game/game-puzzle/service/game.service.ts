/**
 * game.service
 */

import { Injectable } from '@angular/core';
import { GridService } from './grid.service';
import { Tile } from './tile';
import { Store } from '@ngrx/store';
import { SET_GAME_STATE } from './actions.const';

@Injectable()
export class GameService {

    constructor( private gridService: GridService,
                 private store: Store<any> ) {
    }

    public setGameTileSize( size: number ): void {
        if (size > 0) {
            this.store.dispatch({type: SET_GAME_STATE, payload: {tileSize: size}});
        }
        return;
    }

    public setGameWon( won: boolean ): void {
        if (won) {
            this.store.dispatch({type: SET_GAME_STATE, payload: {gameWon: true, gameOver: true}});
        }
        return;
    }

    public newGame(): void {
        this.store.dispatch({type: SET_GAME_STATE, payload: {gameWon: false, gameOver: false}});
        this.gridService.newGame();
    }

    public moveTile( tile: Tile ): void {
        this.gridService.move(tile);
    }

    public selectPhoto( photo: string ): void {
        this.store.dispatch({
            type: SET_GAME_STATE,
            payload: {gameWon: false, gameOver: true, gameImage: photo}
        });
    }
}
