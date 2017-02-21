/**
 * game-timer.component
 */

import {
    Component, OnDestroy, Input, OnChanges,
    SimpleChanges, OnInit, Output, EventEmitter
} from '@angular/core';

@Component({
    selector: 'app-game-timer',
    template: `
<div>{{seconds}}</div>
`
})

export class GameTimerComponent implements OnInit, OnDestroy, OnChanges {

    @Input() public start: boolean;
    @Input() public over: boolean;
    @Output() public onTimerStop = new EventEmitter<number>();

    public seconds: number;
    private intervalId: number;

    constructor() {
    }

    public ngOnInit(): void {
        this.intervalId = 0;
        this.seconds = 0;
    }

    public ngOnDestroy(): void {
        this.clearTimer();
    }

    public ngOnChanges( changes: SimpleChanges ): void {

        // When 'start' changes to true and 'over' does not have any value,
        // it means the game starts and we start the game timer.
        if (changes['start'] && changes['start'].currentValue && !changes['over']) {
            this.startTimer();
        }

        // When 'over' changes to true,
        // it means the game is over and we clear the game timer
        if (changes['over'] && changes['over'].currentValue) {
            this.onTimerStop.emit(this.seconds);
            this.clearTimer();
        }

        // When 'start' changes from true to false
        // it means we open a new game, but the game has not started yet.
        // so we clear the game timer and reset our time to 0
        if (changes['start'] && !changes['start'].currentValue) {
            this.clearTimer();
            this.seconds = 0;
        }
    }

    public clearTimer(): void {
        clearInterval(this.intervalId);
    }

    public startTimer(): void {
        this.intervalId = window.setInterval(() => {
            this.seconds += 1;
        }, 1000);
    }

}
