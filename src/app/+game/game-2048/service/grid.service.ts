/**
 * tile.service
 */

import { Injectable } from '@angular/core';
import { Tile, Coordination } from './tile';
import {
    ADD_TILE, BUILD_GRID, ADD_ID, RESET_TILES, RESET_TILE_STATUS, REMOVE_ID, MOVE_TILE,
} from './actions.const';
import { Store } from '@ngrx/store';

const Size: number = 4;
const StartingTiles: number = 2;

const Vectors = {
    Left: {x: -1, y: 0},
    Right: {x: 1, y: 0},
    Up: {x: 0, y: -1},
    Down: {x: 0, y: 1}
};

/* Change index to coordination */
const indexToCoordination = ( index: number ): Coordination => {

    let coordination: Coordination = {
        x: null,
        y: null
    };

    coordination.x = index % Size;
    coordination.y = Math.floor(index / Size);
    return coordination;
};

/* Check if the coordination is inside the grid */
const withinGrid = ( coordination: Coordination ): boolean => {
    return coordination.x >= 0 && coordination.x < Size &&
        coordination.y >= 0 && coordination.y < Size;
};

/* Change coordination to index */
const coordinationToIndex = ( coordination: Coordination ): number => {
    return coordination.x + coordination.y * Size;
};

export const traversalDirections = ( direction: string ): {x: number[], y: number[]} => {
    let vector = Vectors[direction];
    let positions: {x: number[], y: number[]} = {x: [], y: []};
    for (let i = 0; i < Size; i++) {
        positions.x.push(i);
        positions.y.push(i);
    }

    if (vector.y > 0) {
        positions.y = positions.y.reverse();
    }

    if (vector.x > 0) {
        positions.x = positions.x.reverse();
    }

    return positions;
};

export const checkSameCoordination = ( a: Coordination, b: Coordination ): boolean => {
    return a.x === b.x && a.y === b.y;
};

@Injectable()
export class GridService {

    /*
     * A array to hold all the tiles' Id in their specific index place
     * Their specific index is determined by their coordination
     * */
    private grid: string[];

    /*
     * A array to hold all the tiles
     * */
    private tiles: Tile[];

    constructor( private store: Store<any> ) {
        this.store.select('grid').subscribe(
            ( data: string[] ) => {
                this.grid = data;
            }
        );

        this.store.select('tiles').subscribe(
            ( data: Tile[] ) => {
                this.tiles = data;
            }
        );
    }

    /* Build a grid array. */
    public buildGrid(): void {
        this.store.dispatch({type: BUILD_GRID, payload: Size});
    }

    /* Build Starting tiles position */
    public buildStartingPosition(): void {
        // Reset the tiles array to an brand new empty array
        this.store.dispatch({type: RESET_TILES});
        for (let i = 0; i < StartingTiles; i++) {
            this.randomlyInsertTile();
        }
    }

    /* Insert tile into tiles array randomly */
    public randomlyInsertTile(): void {
        let cells = this.getAllAvailableCells();
        if (cells.length > 0) {
            let randomCell = cells[Math.floor(Math.random() * cells.length)];
            let coordination = indexToCoordination(randomCell);
            let newTile = new Tile(coordination);
            // Add the new tile's Id to grid array
            this.store.dispatch({type: ADD_ID, payload: {index: randomCell, value: newTile.Id}});
            // Add the new tile to tiles array
            this.store.dispatch({type: ADD_TILE, payload: newTile});
        }
    }

    /*
     * Clean up the previous move history.
     * reset every tile's merged status back to false
     * clean all should-be-dump tile in tiles array
     * */
    public prepareMove() {
        this.store.dispatch({type: RESET_TILE_STATUS});
    }

    /* Get a specific tile in tiles array based on a specific coordination */
    public getTileAt( coordination: Coordination ): Tile {
        // We need to check if the coordination is inside the grid
        if (withinGrid(coordination)) {
            // transform coordination to its corresponding index in grid array so that
            // we can get the specific value (tile's Id) in grid array
            let index = coordinationToIndex(coordination);
            let id = this.grid[index];

            // Once we get the tile's id from grid,
            // we can get the specific tile from tiles array
            return this.tiles.find(( t ) => t.Id === id);
        } else {
            return null;
        }
    }

    /* Calculate a next possible coordination a tile could move to */
    public calculateNextPosition( coordination: Coordination, direction: string ): any {
        // the move vector based on the move direction
        let vector = Vectors[direction];
        let previous: Coordination;
        do {
            // Save the current coordination
            previous = coordination;

            // Get the next coordination
            coordination = {
                x: previous.x + vector.x,
                y: previous.y + vector.y
            };

            // If the checkCellAvailability return true, that means the new coordination has no tile
            // and we continue to check the next one in the same direction.
            // If the checkCellAvailability return false,
            // that means the coordination we check either has a tile or is out of the grid
        } while (this.checkCellAvailability(coordination));

        return {
            newPosition: previous, // we save the last available coordination
            next: this.getTileAt(coordination) // we get the tile on non-available coordination
        };
    }

    /* Move a tile to a specific coordination */
    public moveTile( newCoordination: Coordination, old: Tile, next: Tile = null ): any {
        // if the new destination coordination is the same as the tile, we do nothing.
        if (checkSameCoordination(newCoordination, old.coordination)) {
            return;
        }

        // Because the tile would be moved to a new coordination,
        // the tile's Id would be in a new place in grid array.
        // transform the tile's coordination to index,
        // so that the grid could delete the Id before the tile move to a new place.
        let oldIndex = coordinationToIndex(old.coordination);

        // Delete the tile's Id in grid array
        this.store.dispatch({type: REMOVE_ID, payload: {index: oldIndex}});

        // Moving a tile means we set the tile's coordination to a new one,
        // and set it's merged and shouldDump status
        this.store.dispatch({
            type: MOVE_TILE,
            payload: {newCoordination, oldTile: old, nextTile: next}
        });
    }

    /* Save the tile's Id into grid array */
    public saveTileIdIntoGrid( tile: Tile, newCoordination: Coordination ) {
        // After a tile moved to a new coordination,
        // we need to save it's Id to the right place in grid array
        let index = coordinationToIndex(newCoordination);
        this.store.dispatch({type: ADD_ID, payload: {index, value: tile.Id}});
    }

    /* Check if there is any cell in grid array is null */
    public anyCellInGridAvailable(): boolean {
        return this.getAllAvailableCells().length > 0;
    }

    /* Check if any two joint tiles could be merged */
    public tileMatchesAvailable(): boolean {
        for (let i = 0; i < Size * Size; i++) {
            let coordination = indexToCoordination(i);
            let tile = this.getTileAt(coordination);

            if (tile) {
                for (let vectorName in Vectors) {
                    let vector = Vectors[vectorName];
                    let otherCoordi = {x: coordination.x + vector.x, y: coordination.y + vector.y};
                    let other = this.getTileAt(otherCoordi);

                    if (other && other.value === tile.value) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    /* Get all null cell index in grid array */
    private getAllAvailableCells(): number[] {
        // if the cell in grid array has null value, that means that cell
        // is empty and we can insert tile into that cell
        return this.grid.map(( cell: string, index: number ) => {
            if (cell == null) {
                return index;
            } else {
                return null;
            }
        }).filter(( index: number ) => index != null);
    }

    /* Check if a specific cell in tiles array has null value */
    private checkCellAvailability( coordination: Coordination ): boolean {
        // if the coordination is not inside the grid, we return false.
        // if it is inside the grid, we check if the coordination inside the grid has Id value.
        if (withinGrid(coordination)) {
            let index = coordinationToIndex(coordination);
            return !this.grid[index];
        } else {
            return false;
        }
    }
}
