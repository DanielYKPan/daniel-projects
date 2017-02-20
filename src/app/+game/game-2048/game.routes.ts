/**
 * game.routes
 */

import { GameComponent } from './game.component';
import { GamePanelComponent } from './game-panel';
import { GameAboutComponent } from './game-about';

export const routes = [
    {
        path: '',
        component: GameComponent,
        children: [
            {path: '', component: GamePanelComponent},
            {path: 'about', component: GameAboutComponent},
        ]
    },
];
