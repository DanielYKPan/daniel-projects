/**
 * game.routes
 */

import { GameComponent } from './game.component';
import { GameMainComponent } from './main';
import { GameAboutComponent } from './about';

export const routes = [
    {
        path: '',
        component: GameComponent,
        children: [
            {path: '', component: GameMainComponent},
            {path: 'about', component: GameAboutComponent},
        ]
    },
];
