/**
 * game.module
 */

import { NgModule }      from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { GameComponent } from './game.component';
import { routes } from './game.routes';
import { GameSharedModule } from '../shared';
import { GameHeaderComponent } from './game-header';
import { GameBoardComponent } from './game-board';
import { GameService, tilesReducer, gameStaticReducer } from './service';
import { GameCardComponent } from './game-card';
import { GameStateComponent } from './game-state';
import { GameTimerComponent } from './game-timer';
import { GameAboutComponent } from './game-about';

@NgModule({
    imports: [
        GameSharedModule,
        RouterModule.forChild(routes),
        StoreModule.provideStore({
            tiles: tilesReducer,
            gameStatic: gameStaticReducer,
        }),
    ],
    declarations: [
        GameComponent,
        GameHeaderComponent,
        GameBoardComponent,
        GameCardComponent,
        GameStateComponent,
        GameTimerComponent,
        GameAboutComponent,
    ],
    exports: [],
    providers: [
        GameService
    ]
})
export class GameModule {
    public static routes = routes;
}
