/**
 * game.service
 */

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { shuffle } from '../../shared';
import { Tile } from './tile';
import { STORE_TILES, FLIP_TILES, ADD_MOVE, SET_GAME_STATIC, FLIP_ALL } from './actions.const';
import { GameState } from './game-state.enum';

const types: string[] = [
    'taxi', 'motorcycle', 'binoculars', 'bomb', 'anchor', 'rocket', 'castle',
    'leaf', 'paper-plane', 'hammer', 'ship', 'train', 'extinguisher', 'android',
    'shopping-basket', 'bath', 'microchip', 'snowflake', 'alien', 'pagelines',
    'heart', 'star', 'bell', 'award', 'bug'
];

@Injectable()
export class GameService {

    private tempTile: Tile = null;
    private tempIds: string[] = [];

    constructor( private store: Store<any> ) {
    }

    public newGame() {
        let tiles: Tile[] = [];
        let diagrams = shuffle<string>(types.slice(0)).splice(0, 9);
        for (let diagram of diagrams) {
            let tA = new Tile(diagram);
            let tB = new Tile(diagram);
            tiles.push(tA, tB);
        }
        tiles = shuffle<Tile>(tiles);
        this.resetGameStatic();
        this.store.dispatch({type: STORE_TILES, payload: {tiles}});
    }

    public revealTile( tile: Tile ): boolean {
        if (tile.Revealed || this.tempIds.length >= 2) {
            return false
        } else {
            this.tempIds.push(tile.Id);
            this.store.dispatch({type: FLIP_TILES, payload: {ids: [tile.Id], revealed: true}});
            if (this.tempTile) {
                return true;
            } else {
                this.tempTile = tile;
                return false;
            }
        }
    }

    public flipAll( revealed: boolean ): void {
        this.store.dispatch({type: FLIP_ALL, payload: {revealed}});
    }

    public checkMatch( tile: Tile ): void {
        if (!this.tempTile) {
            return;
        }

        this.store.dispatch({type: ADD_MOVE});
        if (this.tempTile.Content !== tile.Content) {
            this.store.dispatch({
                type: FLIP_TILES,
                payload: {ids: this.tempIds, revealed: false}
            });
        } else {
            console.log('check game status');
        }
        this.resetTemp();
    }

    public setGameState( gameState: GameState ): void {
        this.store.dispatch({type: SET_GAME_STATIC, payload: {gameState}});
    }

    private resetGameStatic(): void {
        this.store.dispatch({
            type: SET_GAME_STATIC,
            payload: {gameState: GameState.Prepare, moves: 0}
        });
    }

    private resetTemp(): void {
        if (this.tempTile) {
            this.tempTile = null;
        }

        if(this.tempIds.length > 0) {
            this.tempIds = [];
        }
    }
}
