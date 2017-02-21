/**
 * tiles.reducer
 */
import { ActionReducer } from '@ngrx/store';
import { Tile } from './tile';
import { STORE_TILES, MOVE_TILES } from './actions.const';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { coordinationToIndex } from './grid.service';

export const tilesReducer: ActionReducer<Tile[]> = ( state: Tile[] = [], action: any ) => {

    switch (action.type) {
        case STORE_TILES:
            return Object.assign([], action.payload.tiles);

        case MOVE_TILES:
            return state.map(( tile ) => {
                if (tile.Id === action.payload.nextTile.Id) {
                    return Object.assign(
                        new Tile(),
                        tile,
                        {coordination: action.payload.tile.Coordination}
                    );
                } else if (tile.Id === action.payload.tile.Id) {
                    return Object.assign(
                        new Tile(),
                        tile,
                        {coordination: action.payload.nextTile.Coordination}
                    );
                } else {
                    return tile;
                }
            });

        default:
            return state;
    }
};

export const gameWon = () => {
    return ( state: any ) => state
        .distinctUntilChanged()
        .map(( tiles: Tile[] ) => {

            if (tiles.length === 0) {
                return false;
            }

            let won = true;
            let sqrt = Math.sqrt(tiles.length);

            for (let t of tiles) {
                let tValue = coordinationToIndex(t.Coordination, sqrt);
                if (t.Value !== tValue) {
                    won = false;
                    break;
                }
            }

            return won;
        });
};
