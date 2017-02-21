/**
 * point.component
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { PointService } from './point.service';
import { Subscription } from 'rxjs';
import { AchievementEventService } from '../achievement/events/achievementEvent.service';

@Component({
    selector: 'quiz-points',
    templateUrl: './point.component.html',
    styleUrls: ['./point.component.scss']
})

export class QuizPointComponent implements OnInit, OnDestroy {

    public totalPoints: number;

    private totalPointsChangedSub: Subscription;
    private achievementEventSub: Subscription;

    constructor( private pointService: PointService,
                 private achievementEventService: AchievementEventService ) {
    }

    public ngOnInit(): void {
        this.totalPoints = this.pointService.getTotalPoints();
        this.totalPointsChangedSub = this.pointService.totalPointsChange.subscribe(
            ( data: number ) => this.totalPoints = data
        );
        this.achievementEventSub = this.achievementEventService.achievementEvent.subscribe(
            ( data ) => {
                this.totalPoints = this.pointService.getTotalPoints();
            }
        );
    }

    public ngOnDestroy(): void {
        if (this.totalPointsChangedSub) {
            this.totalPointsChangedSub.unsubscribe();
        }

        if (this.achievementEventSub) {
            this.achievementEventSub.unsubscribe();
        }
    }
}
