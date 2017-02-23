/**
 * game.routes
 */

import { GameCenterComponent } from './game-center';

export const routes = [
    {
        path: '',
        children: [
            {path: '', component: GameCenterComponent},
            {path: '2048', loadChildren: './game-2048#GameModule'},
            {path: 'minesweeper', loadChildren: './game-minesweeper#GameModule'},
            {path: 'puzzle', loadChildren: './game-puzzle#GameModule'},
            {path: 'quiz', loadChildren: './game-quiz#GameModule'},
            {path: 'memory', loadChildren: './game-memory#GameModule'},
        ]
    },
];
