/**
 * index
 */

export { GameService, IGameStatus } from './game.service';
export { GameLevelService, ILevel, LEVELS } from './game-level.service';
export { Tile } from './tile';
export * from './actions.const';
export { tilesReducer, gameStatus } from './tiles.reducer';
