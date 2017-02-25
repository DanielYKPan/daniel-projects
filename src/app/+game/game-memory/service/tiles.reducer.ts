/**
 * tiles.reducer
 */

import { ActionReducer } from '@ngrx/store';
import { Tile } from './tile';
import { STORE_TILES, FLIP_TILES, FLIP_ALL } from './actions.const';

export const tilesReducer: ActionReducer<Tile[]> = ( state: Tile[] = [], action: any ) => {
    switch (action.type) {
        case STORE_TILES:
            return Object.assign([], action.payload.tiles);

        case FLIP_TILES:
        case FLIP_ALL:
            return state.map(( tile, index ) => details(tile, action));

        default:
            return state;
    }
};

function details( state: Tile, action: any ): any {
    switch (action.type) {
        case FLIP_TILES:
            if (action.payload.ids.indexOf(state.Id) > -1) {
                return Object.assign(new Tile(), state, {revealed: action.payload.revealed});
            } else {
                return state;
            }

        case FLIP_ALL:
            return Object.assign(new Tile(), state, {revealed: action.payload.revealed});

        default:
            return state;
    }
}
