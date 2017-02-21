/**
 * achievementNotifier.component
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AchievementEventService } from './events/achievementEvent.service';
import { Subscription } from 'rxjs';
import { IAchievement } from './achievement.service';
import { NotifierService } from 'ng2-yk-notifier';

@Component({
    selector: 'app-quiz-achievement-notifier',
    template: '<div></div>'
})

export class QuizAchievementNotifierComponent implements OnInit, OnDestroy {

    private achievementEventSub: Subscription;

    constructor( private notifier: NotifierService,
                 private achievementEventService: AchievementEventService ) {
    }

    public ngOnInit(): void {
        this.achievementEventSub = this.achievementEventService.achievementEvent.subscribe(
            ( data: IAchievement ) => {
                setTimeout(() => {
                    this.notifier.info(
                        data.name + ' (+' + data.points + ')',
                        data.description
                    );
                }, 500);
            }
        );
    }

    public ngOnDestroy(): void {
        if (this.achievementEventSub) {
            this.achievementEventSub.unsubscribe();
        }
    }
}
