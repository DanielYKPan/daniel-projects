/**
 * game.routes
 */

import { GameCenterComponent } from './game-center.component';

export const routes = [
    {
        path: '',
        children: [
            {path: '', component: GameCenterComponent},
            {path: '2048', loadChildren: './game-2048#GameModule'},
            {path: 'minesweeper', loadChildren: './game-minesweeper#GameModule'},
        ]
    },
];
