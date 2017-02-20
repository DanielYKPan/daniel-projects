/**
 * game.service
 */

import { Injectable } from '@angular/core';
import { GridService, Tile, traversalDirections, checkSameCoordination, IGameState } from './';
import { Store } from '@ngrx/store';
import { SET_GAME_STATE } from './actions.const';

@Injectable()
export class GameService {

    private gameState: IGameState;

    constructor( private gridService: GridService,
                 private store: Store<any> ) {

        this.store.select('gameState').subscribe(
            ( data: IGameState ) => {
                this.gameState = data;
            }
        );
    }

    public newGame() {
        this.resetGameStatus();
        this.gridService.buildGrid();
        this.gridService.buildStartingPosition();
    }

    public move( direction: string ) {

        // If the game is over,
        // we are not allowed to continue to make any move
        if (this.gameState.gameOver) {
            return;
        }

        let hasMoved = false; // set a flag to see if any tiles moved
        let scores = 0; // a variable to hold the scores of this move
        let highScores = this.gameState.highScores; // a variable to hold the highest scores
        let gameWon = false; // a flag to see if a game has achieved gold
        let gameOver = false; // a flag to see if a game has ended
        this.gridService.prepareMove();

        // We get the grid checking order based on the move direction
        let positions = traversalDirections(direction);

        positions.x.forEach(( x ) => {
            positions.y.forEach(( y ) => {
                let originalPosition = {x, y};
                let tile = this.gridService.getTileAt(originalPosition);

                if (tile) {
                    let cell = this.gridService.calculateNextPosition(originalPosition, direction);
                    let next: Tile = cell.next;

                    // If a tile's next tile exists and
                    // the next tile has not been merged yet and it has the same value
                    // that means we could merge these two tiles
                    if (next && next.value === tile.value && !next.merged) {
                        next.value = tile.value * 2; // double the next tile's value

                        tile.shouldDump = true; // set the tile shouldDump status to true
                                                // so that we could clean this tile before next move

                        next.merged = true; // set the next tile's merged status to true
                                            // so that we know it could not merge any more
                                            // in the next check

                        // Move the tile to the new coordination,
                        // so that we could see the moving animations
                        this.gridService.moveTile(next.coordination, tile, next);

                        scores += next.value; // Add the new value to scoring table

                        hasMoved = true;

                        // Check if the merged tile's value has achieved the game gold
                        if (next.value >= this.gameState.gameGold && !gameWon) {
                            gameWon = true;
                        }
                    } else {
                        // It a tile's next tile not exists,
                        // that means the new coordination is empty
                        // and we could move the tile to the new place
                        this.gridService.moveTile(cell.newPosition, tile);
                        this.gridService.saveTileIdIntoGrid(tile, cell.newPosition);
                    }

                    if (!hasMoved && !checkSameCoordination(originalPosition, cell.newPosition)) {
                        hasMoved = true;
                    }
                }
            });
        });

        // Update the game score after grid checking
        if (scores > 0) {
            scores = this.gameState.scores + scores;
            if (scores > highScores) {
                highScores = scores;
                localStorage.setItem('2048-best', highScores.toString());
            }
        } else {
            scores = this.gameState.scores;
        }

        // If any tile's move to a new place,
        // that means we at least make a proper move
        // and we randomly add a new tile into the grid
        if (hasMoved) {
            this.gridService.randomlyInsertTile();

            // After we insert a new tile,
            // we need to check if there is any empty cell or any merge-able tiles.
            // If there is none of those, that means the game is over
            if (!gameWon && !this.moveAvailable()) {
                gameOver = true;
            }
        }

        this.store.dispatch({
            type: SET_GAME_STATE, payload: {
                scores,
                highScores,
                gameOver,
                gameWon: this.gameState.gameWon || gameWon
            }
        });

        return;
    }

    public setTileStyle( width: number ): void {
        let tileSize = width > this.gameState.tileSize ? this.gameState.tileSize : width;
        let fontSize = width * 0.4 > this.gameState.fontSize ?
            this.gameState.fontSize : width * 0.4;

        this.store.dispatch({
            type: SET_GAME_STATE, payload: {
                tileSize,
                fontSize
            }
        });
        return;
    }

    private moveAvailable(): boolean {
        return this.gridService.anyCellInGridAvailable() || this.gridService.tileMatchesAvailable();
    }

    private resetGameStatus(): void {
        this.store.dispatch({
            type: SET_GAME_STATE, payload: {
                gameWon: false,
                gameOver: false,
                scores: 0,
            }
        });
    }
}
