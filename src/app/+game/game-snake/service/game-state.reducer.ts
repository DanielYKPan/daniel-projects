/**
 * game-state.reducer
 */

import { ActionReducer } from '@ngrx/store';
import { SET_GAME_STATE, INCREASE_SCORES } from './actions';

export interface IGameState {
    gameOver: boolean;
    scores: number;
    best: number;
}

const defaultGameState = {
    gameOver: true,
    scores: 0,
    best: +localStorage.getItem('snake-best') || 0,
};

export const gameStateReducer: ActionReducer<any> =
    ( state: IGameState = defaultGameState, action: any ) => {
        switch (action.type) {
            case SET_GAME_STATE:
                return Object.assign({}, state, action.payload);

            case INCREASE_SCORES:
                let scores = state.scores + action.payload.scores;
                let best = state.best;
                return Object.assign({}, state, {
                    scores,
                    best: scores > best ? scores : best,
                });

            default:
                return state;
        }
    };
