/**
 * movie.module
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { routes } from './game.routes';
import { GameComponent } from './game.component';
import { StoreModule } from '@ngrx/store';
import {
    GameService, GridService, KeyboardService,
    tilesReducer, gridReducer, gameStateReducer
} from './service';
import { GameOverBoardComponent } from './game-over-board';
import { GameGridCellComponent } from './game-grid-cell';
import { GameTileCellComponent } from './game-tile-cell';
import { GameHeaderComponent } from './game-header';
import { GameScoreComponent } from './game-score';
import { GamePanelComponent } from './game-panel';
import { GameAboutComponent } from './game-about';
import { MyHammerConfig } from './hammer.config';
import { GameSharedModule } from '../shared';

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        GameComponent,
        GameHeaderComponent,
        GameScoreComponent,
        GamePanelComponent,
        GameAboutComponent,
        GameGridCellComponent,
        GameTileCellComponent,
        GameOverBoardComponent,
    ],
    imports: [
        GameSharedModule,
        RouterModule.forChild(routes),
        StoreModule.provideStore({
            tiles: tilesReducer,
            grid: gridReducer,
            gameState: gameStateReducer
        }),
    ],
    providers: [
        GameService,
        GridService,
        KeyboardService,
        {
            // hammer instantion with custom config
            provide: HAMMER_GESTURE_CONFIG,
            useClass: MyHammerConfig,
        }
    ]
})
export class GameModule {
    public static routes = routes;
}
