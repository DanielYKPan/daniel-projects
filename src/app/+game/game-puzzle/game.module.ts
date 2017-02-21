/**
 * movie.module
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { routes } from './game.routes';
import { GameComponent } from './game.component';
import { GameHeaderComponent } from './header';
import { GameMainComponent } from './main';
import { GameGalleryComponent } from './gallery';
import { tilesReducer, gameStateReducer, GridService, GameService } from './service';
import { GameBoardComponent } from './board';
import { GameTileComponent } from './tile';
import { GameControlComponent } from './control';
import { GameAboutComponent } from './about';
import { GameSharedModule } from '../shared';

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        GameComponent,
        GameHeaderComponent,
        GameMainComponent,
        GameGalleryComponent,
        GameBoardComponent,
        GameTileComponent,
        GameControlComponent,
        GameAboutComponent,
    ],
    imports: [
        GameSharedModule,
        RouterModule.forChild(routes),
        StoreModule.provideStore({
            tiles: tilesReducer,
            gameState: gameStateReducer
        }),
    ],
    providers: [
        GridService,
        GameService,
    ],
})
export class GameModule {
    public static routes = routes;
}
