/**
 * game-timer.component
 */

import {
    Component, OnInit, Input, trigger, style, transition,
    animate, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'app-game-memory-timer',
    templateUrl: 'game-timer.component.html',
    styleUrls: ['./game-timer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('timeState', [
            transition('* => *', [
                style({
                    opacity: 1,
                    transform: 'scale(1)'
                }),
                animate('900ms ease-in', style({
                    opacity: 0,
                    transform: 'scale(2)'
                }))
            ]),
        ])
    ]
})
export class GameTimerComponent implements OnInit {

    @Input() public time: string;

    constructor() {
    }

    public ngOnInit() {
    }
}
