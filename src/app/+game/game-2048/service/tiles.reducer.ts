/**
 * tiles.reducer
 */
import { ActionReducer } from '@ngrx/store';
import { Tile } from './tile';
import { ADD_TILE, RESET_TILES, RESET_TILE_STATUS, MOVE_TILE } from './actions.const';

export const tilesReducer: ActionReducer<Tile[]> = ( state: Tile[] = [], action: any ) => {
    switch (action.type) {

        case RESET_TILES:
            return [];

        case ADD_TILE:
            return [
                ...state,
                Object.assign(new Tile(), action.payload)
            ];

        case MOVE_TILE:
            return state.map(( tile ) => {
                if (action.payload.nextTile && tile.Id === action.payload.nextTile.Id) {
                    return Object.assign(new Tile(), tile, action.payload.nextTile);
                }

                if (tile.Id === action.payload.oldTile.Id) {
                    return Object.assign(new Tile(), tile, action.payload.oldTile,
                        {coordination: action.payload.newCoordination});
                } else {
                    return tile;
                }
            });

        case RESET_TILE_STATUS:
            return state.filter(( tile ) => !tile.shouldDump)
                .map(( tile ) => {
                    if (tile.merged) {
                        return Object.assign(new Tile(), tile, {merged: false});
                    }
                    return tile;
                });

        default:
            return state;
    }
};
