/**
 * game.routes
 */

import { GameComponent } from './game.component';
import { GameHomeComponent } from './home';
import { GameEndComponent } from './end';
import { QuizChooserComponent } from './quiz-chooser';
import { QuizGameComponent, QuizsResolve } from './quiz-game';
import { QuizAchievementListComponent } from './achievement';

export const routes = [
    {
        path: '',
        component: GameComponent,
        children: [
            {path: '', component: GameHomeComponent},
            {path: 'chooser', component: QuizChooserComponent},
            {path: 'achievements', component: QuizAchievementListComponent},
            {path: 'chooser/:slug', component: QuizGameComponent, resolve: {quizs: QuizsResolve}},
            {path: 'end', component: GameEndComponent},
        ]
    },
];
