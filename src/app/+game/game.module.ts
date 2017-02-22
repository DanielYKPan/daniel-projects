/**
 * game.module
 */

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './game.routes';
import { GameCenterComponent, GameNameComponent } from './game-center';

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        GameCenterComponent,
        GameNameComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
})
export class GameModule {
    public static routes = routes;
}
