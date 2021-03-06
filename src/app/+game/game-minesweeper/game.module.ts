/**
 * game.module
 */

import { NgModule }      from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { GameComponent } from './game.component';
import { routes } from './game.routes';
import { GameBoardComponent } from './game-board';
import { GameService, GameLevelService, tilesReducer } from './service';
import { GameTileComponent } from './game-tile';
import { GameTimerComponent } from './game-timer';
import { GameAboutComponent } from './game-about';
import { GameSharedModule } from '../shared';

@NgModule({
    imports: [
        GameSharedModule,
        RouterModule.forChild(routes),
        StoreModule.provideStore({
            tiles: tilesReducer,
        }),
    ],
    declarations: [
        GameComponent,
        GameBoardComponent,
        GameTileComponent,
        GameTimerComponent,
        GameAboutComponent,
    ],
    exports: [],
    providers: [
        GameService,
        GameLevelService
    ]
})
export class GameModule {
    public static routes = routes;
}
