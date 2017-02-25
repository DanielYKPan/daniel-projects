/**
 * game-static.reducer
 */

import { GameState } from './game-state.enum';
import { ActionReducer } from '@ngrx/store';
import { SET_GAME_STATIC, ADD_MOVE } from './actions.const';

export interface IGameStatic {
    gameState: GameState;
    moves: number;
    best: number;
}

const defaultGameStatic = {
    gameState: GameState.Prepare,
    moves: 0,
    best: +localStorage.getItem('memory-best') || 0
};

export const gameStaticReducer: ActionReducer<any> =
    ( state: IGameStatic = defaultGameStatic, action: any ) => {
        switch (action.type) {
            case SET_GAME_STATIC:
                return Object.assign({}, state, action.payload);

            case ADD_MOVE:
                return Object.assign({}, state, {moves: state.moves + 1});

            default:
                return state;
        }
    };
