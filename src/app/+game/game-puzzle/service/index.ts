/**
 * index
 */

export { Tile, ICoordination } from './tile';
export { tilesReducer, gameWon } from './tiles.reducer';
export { gameStateReducer, IGameState } from './game-state.reducer';
export { STORE_TILES, MOVE_TILES, SET_GAME_STATE } from './actions.const';
export { GameService } from './game.service';
export { GridService, indexToCoordination, coordinationToIndex } from './grid.service';
