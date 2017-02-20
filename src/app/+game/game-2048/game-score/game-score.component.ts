/**
 * game-score.component
 */

import {
    Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, trigger,
    transition, style, animate, AnimationTransitionEvent
} from '@angular/core';

@Component({
    selector: 'app-game-score',
    templateUrl: './game-score.component.html',
    styleUrls: ['./game-score.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('panelState', [
            transition('void => *', [
                style({opacity: 0, transform: 'translateY(100%)'}),
                animate('600ms ease-out')
            ])
        ]),
        trigger('scoreIncreasedState', [
            transition('void => active', [
                style({opacity: 1, transform: 'translateY(0)'}),
                animate('800ms ease-in', style({
                        opacity: 0,
                        transform: 'translateY(-80px)'
                    })
                )])
        ])
    ]
})

export class GameScoreComponent implements OnInit, OnChanges {

    @Input() public scores: number;
    @Input() public best: number;
    public increasedScores: Array<{value: number, state: string}> = [];

    constructor() {
    }

    public ngOnInit(): void {
    }

    public ngOnChanges( changes: SimpleChanges ): void {
        let preScores = changes['scores'].previousValue;
        let curScores = changes['scores'].currentValue;
        let incScores = 0;
        if (curScores >= 0 && preScores >= 0) {
            incScores = curScores - preScores;
        }
        if (incScores > 0) {
            this.increasedScores.push({value: incScores, state: 'active'});
        }
    }

    public animationDone( event: AnimationTransitionEvent ): void {
        if (event.toState === 'active') {
            this.increasedScores.shift();
        }
    }
}
