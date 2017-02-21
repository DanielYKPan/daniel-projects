/**
 * movie.module
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { routes } from './game.routes';
import { GameComponent } from './game.component';
import { GameTimerComponent } from './timer';
import { GameHomeComponent, GameHomeAchievementsComponent } from './home';
import { GameEndComponent } from './end';
import { QuizThemeService } from './quiz-game';
import { QuizChooserComponent } from './quiz-chooser';
import { QuizGameComponent, QuizsResolve, QuizService } from './quiz-game';
import {
    AchievementEventService,
    ProfileService,
    AchievementService,
    CompletedGamesHandler,
    ProfileHandler,
    ComboHandler,
    MasterThemeHandler,
    AnswerAmountHandler,
    ScoreHandler,
    MultiAchievementHandler,
    QuizAchievementNotifierComponent,
    QuizAchievementListComponent
} from './achievement';
import { NotifierModule } from 'ng2-yk-notifier';
import { QuizPointComponent, PointService } from './point';
import { QuizBoostersComponent, BoosterService } from './booster';
import { GameSharedModule } from '../shared';

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        GameComponent,
        GameHomeComponent,
        GameHomeAchievementsComponent,
        GameEndComponent,
        GameTimerComponent,
        QuizChooserComponent,
        QuizGameComponent,
        QuizAchievementNotifierComponent,
        QuizAchievementListComponent,
        QuizPointComponent,
        QuizBoostersComponent,
    ],
    imports: [
        GameSharedModule,
        HttpModule,
        RouterModule.forChild(routes),
        NotifierModule.forRoot({
            animate: 'fade',
            position: ['bottom', 'center'],
            notifierLife: 2000
        }),
    ],
    providers: [
        QuizService,
        QuizsResolve,
        QuizThemeService,

        AchievementEventService,
        AchievementService,
        ProfileService,

        ProfileHandler,
        CompletedGamesHandler,
        ComboHandler,
        MasterThemeHandler,
        AnswerAmountHandler,
        ScoreHandler,
        MultiAchievementHandler,

        PointService,
        BoosterService,
    ]
})
export class GameModule {
    public static routes = routes;
}
