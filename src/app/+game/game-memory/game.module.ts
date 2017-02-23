/**
 * game.module
 */

import { NgModule }      from '@angular/core';
import { RouterModule } from '@angular/router';
import { GameComponent } from './game.component';
import { routes } from './game.routes';
import { GameSharedModule } from '../shared';
import { GameHeaderComponent } from './game-header';

@NgModule({
    imports: [
        GameSharedModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        GameComponent,
        GameHeaderComponent,
    ],
    exports: [],
    providers: [
    ]
})
export class GameModule {
    public static routes = routes;
}
