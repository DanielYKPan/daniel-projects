/**
 * grid.service
 */

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Tile, ICoordination } from './tile';
import { STORE_TILES, MOVE_TILES } from './actions.const';
import { IGameState } from './game-state.reducer';

const Vectors = [{x: -1, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}];

/* Change index to coordination */
export const indexToCoordination = ( index: number, size: number ): ICoordination => {

    let coordination: ICoordination = {
        x: null,
        y: null
    };

    coordination.x = index % size;
    coordination.y = Math.floor(index / size);
    return coordination;
};

/* Change coordination to index */
export const coordinationToIndex = ( coordination: ICoordination, size: number ): number => {
    return coordination.x + coordination.y * size;
};

// Random Shuffling An Array the Fisher-Yates (aka Knuth) Way
const shuffle = ( list: Tile[] ): Tile[] => {
    let currentIndex = list.length;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        let temporaryValue = list[currentIndex];
        list[currentIndex] = list[randomIndex];
        list[randomIndex] = temporaryValue;
    }

    return list;
};

/** Check if a puzzle is solvable */
const isSolvable = ( arr: Tile[] ) => {
    let invCount = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length - 1; j++) {
            if (arr[j].Value > arr[i].Value) {
                invCount++;
            }
        }
    }

    return invCount % 2 === 0;
};

/* Check if the coordination is inside the grid */
const withinGrid = ( coordination: ICoordination, size: number ): boolean => {
    return coordination.x >= 0 && coordination.x < size &&
        coordination.y >= 0 && coordination.y < size;
};

@Injectable()
export class GridService {

    private _prepTiles: Tile[];
    private _tiles: Tile[];
    private _gameState: IGameState;

    constructor( private store: Store<any> ) {
        this.store.select('tiles').subscribe(
            ( data: Tile[] ) => {
                this._tiles = data;
            }
        );

        this.store.select('gameState').subscribe(
            ( data: IGameState ) => {
                this._gameState = data;
            }
        );
    }

    public newGame(): void {
        this.generateGameGrid();
        this.shuffleGameGrid();
        this.store.dispatch({type: STORE_TILES, payload: {tiles: this._prepTiles}});
    }

    /* Move a tile */
    public move( tile: Tile ): void {

        // we could not move a blank tile
        if (tile.Blank) {
            return;
        }

        // loop through a tile's neighbour
        for (let v of Vectors) {
            let nextCoordination = {x: tile.Coordination.x + v.x, y: tile.Coordination.y + v.y};
            let nextTile = this.getTile(nextCoordination);

            // if the tile's neighbour is a blank tile, we move the tile to the blank tile position
            if (nextTile && nextTile.Blank) {
                this.store.dispatch({type: MOVE_TILES, payload: {tile, nextTile}});
                return;
            }
        }

        return;
    }

    /*
     * Generate the game grid
     * */
    private generateGameGrid(): void {
        this._prepTiles = [];
        let tilesLength: number = this._gameState.gameSize * this._gameState.gameSize;
        for (let i = 0; i < tilesLength; i++) {
            let tile: Tile;
            let coordination = indexToCoordination(i, this._gameState.gameSize);
            if (i !== tilesLength - 1) {
                tile = new Tile(i, coordination);
            } else {
                tile = new Tile(i, coordination, true);
            }
            this._prepTiles.push(tile);
        }
    }

    /*
     * Shuffle the game grid
     * */
    private shuffleGameGrid(): void {
        this._prepTiles = shuffle(this._prepTiles);
        if (!isSolvable(this._prepTiles)) {
            this.shuffleGameGrid();
            return;
        }

        this._prepTiles.map(( tile: Tile, index: number ) => {
            tile.Coordination = indexToCoordination(index, this._gameState.gameSize);
        });
        return;
    }

    /* Get a Tile with a specific coordination */
    private getTile( coordination: ICoordination ): Tile {

        // if the coordination is not in the game grid, return null
        if (!withinGrid(coordination, this._gameState.gameSize)) {
            return null;
        }

        for (let t of this._tiles) {
            if (t.Coordination.x === coordination.x && t.Coordination.y === coordination.y) {
                return t;
            }
        }

        return null;
    }
}
