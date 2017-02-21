/**
 * game.service
 */

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    STORE_TILES, REVEAL_TILE, UNCOVER_TILE, COVER_TILE, HIT_MINE,
    REVEAL_ALL
} from './actions.const';
import { Tile } from './tile';
import { GameLevelService } from './game-level.service';

const TraversalPaths = [
    {x: -1, y: -1},
    {x: 0, y: -1},
    {x: 1, y: -1},
    {x: -1, y: 0},
    {x: 1, y: 0},
    {x: -1, y: 1},
    {x: 0, y: 1},
    {x: 1, y: 1}
];

export interface IGameStatus {
    best?: number;
    gameStart?: boolean;
    gameOver: boolean;
    gameWon: boolean;
    flags: number;
}

/* Change coordination to index */
const coordinationToIndex = ( coordination: {x: number, y: number}, width: number ): number => {
    return coordination.x + coordination.y * width;
};

/* Transform index to coordination */
const indexToCoordination = ( index: number, width: number ): {x: number; y: number} => {
    let x = index % width;
    let y = (index - x) / width;

    return {x, y};
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

@Injectable()
export class GameService {

    private status: IGameStatus;

    private tiles: Tile[];

    get Status(): IGameStatus {
        return this.status;
    }

    constructor( private gameLevel: GameLevelService,
                 private store: Store<any> ) {
        this.store.select('tiles').subscribe(
            ( data: Tile[] ) => {
                this.tiles = data;
            }
        );
    }

    public newGame(): void {
        this.resetGameStatus();
        let tiles = this.buildTileGrid();
        tiles = shuffle(tiles);
        tiles = this.setTilesContent(tiles);
        this.store.dispatch({type: STORE_TILES, payload: {tiles}});
    }

    public clickTile( tile: Tile ): void {
        // If the game is over, do nothing
        // If the clicked tile is covered, do nothing
        // If the clicked tile is revealed, do nothing
        if (this.status.gameOver || tile.Covered || tile.Revealed) {
            return;
        }

        // Hit a non-mine tile
        if (tile.Content === null || (tile.Content && tile.Content !== 'mine')) {
            this.hitNonMineTile(tile);
            return;
        }

        // Hit a mine tile
        if (tile.Content && tile.Content === 'mine') {
            this.store.dispatch({type: HIT_MINE, payload: tile.Id});
            return;
        }
    }

    /*
     * Cover or uncover a tile
     * */
    public coverTile( tile: Tile ): void {
        if (tile.Revealed || this.status.gameOver) {
            return;
        }

        // if a tile is not covered and we still have flags,
        // we could cover a tile.
        // else we uncover a tile
        if (!tile.Covered && this.status.flags > 0) {
            this.store.dispatch({type: COVER_TILE, payload: tile.Id});
            return;
        } else {
            this.store.dispatch({type: UNCOVER_TILE, payload: tile.Id});
            return;
        }
    }

    /*
     * Set the game status gameStart to true
     *
     * this gameStart is a flag to inform game timer
     * to start the timer once it set to true
     * */
    public startGame(): void {
        this.status.gameStart = true;
    };

    public changeGameStatus( status: IGameStatus ) {
        this.status.gameWon = status.gameWon;
        this.status.gameOver = status.gameOver;
        this.status.flags = status.flags;

        if (this.status.gameOver && this.status.gameWon) {
            this.revealAll();
        }
    }

    /*
     * Store the best record into local storage
     * */
    public setBestRecord( time: number ): void {
        if (this.status.gameWon && ( this.status.best == null || time < this.status.best)) {
            this.status.best = time;
            localStorage.setItem(
                'minesweeper-best-' + this.gameLevel.GameLevel.name,
                time.toString()
            );
        }
    }

    /*
     * Reveal all tiles that are not covered or already revealed
     * */
    private revealAll(): void {
        this.store.dispatch({type: REVEAL_ALL});
    }

    private buildTileGrid(): Tile[] {
        let tiles: Tile[] = [];
        let nonMineTileNum = this.gameLevel.GameLevel.height * this.gameLevel.GameLevel.width
            - this.gameLevel.GameLevel.mines;

        for (let i = 0; i < nonMineTileNum; i++) {
            let tile = new Tile();
            tiles.push(tile);
        }

        for (let i = 0; i < this.gameLevel.GameLevel.mines; i++) {
            let tile = new Tile('mine');
            tiles.push(tile);
        }

        return tiles;
    }

    /*
     * Set every tiles' content
     *
     * set every tile's content in the initial tiles array,
     * after the initial tiles array has added mine tiles and being shuffled.
     * */
    private setTilesContent( tiles: Tile[] ): Tile[] {
        tiles.map(( tile: Tile, index: number ) => {

            // Set the tile coordination based on its index in the tiles array
            tile.Coordination = indexToCoordination(index, this.gameLevel.GameLevel.width);

            // check if the tile content is mine,
            // If it is not a mine, calculate the mines surrounding the tile and set its number
            if (tile.Content !== 'mine') {
                let surroundingMines: number = 0;
                this.getNeighbourTiles(tile, ( t: Tile ) => {
                    if (t.Content === 'mine') {
                        surroundingMines++;
                    }
                }, tiles);
                tile.Content = surroundingMines ? surroundingMines.toString() : null;
            }
        });
        return tiles;
    }

    /* Reset the game status */
    private resetGameStatus() {
        this.status = {
            best: +localStorage.getItem(
                'minesweeper-best-' + this.gameLevel.GameLevel.name
            ) || null,
            gameStart: false,
            gameOver: false,
            gameWon: false,
            flags: this.gameLevel.GameLevel.mines
        };
    }

    /* Handle the process of hit a non-mine tile */
    private hitNonMineTile( tile: Tile ): void {
        // if the tile is not revealed or covered,
        // we reveal the tile
        if (!tile.Revealed && !tile.Covered) {
            this.store.dispatch({type: REVEAL_TILE, payload: tile.Id});

            // it the tile is a blank tile,
            // we also reveal all its surrounding non mine tiles
            if (tile.Content === null) {
                this.getNeighbourTiles(tile, ( t ) => {
                    if (t.Content !== 'mine') {
                        this.hitNonMineTile(t);
                    }
                });
            }
            return;
        }
        return;
    }

    /*
     * Get a tile's surrounding tiles
     * */
    private getNeighbourTiles( tile: Tile, cb: ( t: Tile ) => any, tiles?: Tile[], ) {
        for (let tp of TraversalPaths) {
            let neighbourX = tile.Coordination.x + tp.x;
            let neighbourY = tile.Coordination.y + tp.y;

            if (neighbourX >= 0 &&
                neighbourX < this.gameLevel.GameLevel.width &&
                neighbourY >= 0 &&
                neighbourY < this.gameLevel.GameLevel.height) {
                let position = coordinationToIndex({
                    x: neighbourX,
                    y: neighbourY
                }, this.gameLevel.GameLevel.width);

                let t;
                if (tiles) {
                    t = tiles[position];
                } else {
                    t = this.tiles[position];
                }

                cb(t);
            }
        }
    }
}
