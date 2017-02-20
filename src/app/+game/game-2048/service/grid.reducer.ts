/**
 * grid.reducer
 */

import { ActionReducer } from '@ngrx/store';
import { BUILD_GRID, ADD_ID, REMOVE_ID } from './actions.const';

export const gridReducer: ActionReducer<string[]> = ( state: string[] = [], action: any ) => {
    switch (action.type) {
        case BUILD_GRID:
            let size = action.payload;
            let grid = [];
            for (let i = 0; i < size * size ; i++) {
                grid.push(null);
            }
            return grid;

        case ADD_ID:
            return state.map(( value, index ) => {
                if (index === action.payload.index) {
                    return action.payload.value;
                } else {
                    return value;
                }
            });

        case REMOVE_ID:
            return state.map(( value, index ) => {
                if (index === action.payload.index) {
                    return null;
                } else {
                    return value;
                }
            });

        default:
            return state;
    }
};
