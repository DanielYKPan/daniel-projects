/**
 * game-state.reducer
 */

import { ActionReducer } from '@ngrx/store';
import { SET_GAME_STATE } from './actions.const';

export interface IGameState {
    gameOver: boolean;
    gameWon: boolean;
    gameImage: string;
    gameSize: number;
    tileSize: number;
}

const defaultGameState = {
    gameOver: true,
    gameWon: false,
    gameImage: 'adriana.jpg',
    gameSize: 3,
    tileSize: 120
};

export const gameStateReducer: ActionReducer<any> =
    ( state: any = defaultGameState, action: any ) => {
        switch (action.type) {
            case SET_GAME_STATE:
                return Object.assign({}, state, action.payload);

            default:
                return state;
        }
    };
