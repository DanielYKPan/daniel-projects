/**
 * game.routes
 */

import { GameCenterComponent } from './game-center.component';

export const routes = [
    {
        path: '',
        children: [
            {path: '', component: GameCenterComponent},
        ]
    },
];
