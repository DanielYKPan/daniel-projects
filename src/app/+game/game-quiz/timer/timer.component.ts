/**
 * timer.component
 */

import {
    Component, OnInit, Input, OnChanges,
    SimpleChanges, OnDestroy, Output, EventEmitter
} from '@angular/core';
import { Timer } from './timer';

@Component({
    selector: 'app-game-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss']
})

export class GameTimerComponent implements OnInit, OnChanges, OnDestroy {

    @Input() public timer: Timer;
    @Output() public onTimerExpire = new EventEmitter<boolean>();

    private intervalId: number;

    constructor() {
    }

    public ngOnInit(): void {
    }

    public ngOnChanges( changes: SimpleChanges ): void {

        if (this.intervalId !== null) {
            this.clearTimer();
        }

        if (changes['timer'] && changes['timer'].currentValue) {
            let timeNow = new Date().getTime();
            this.intervalId = window.setInterval(() => {
                let currentTime = new Date().getTime();
                this.timer.Current = this.timer.Max +
                    this.timer.Bonus - ((currentTime - timeNow) / 1000);
                if (this.timer.Current <= 0) {
                    this.timer.Current = 0;
                    this.onTimerExpire.emit(true);
                    this.clearTimer();
                }

                if (this.timer.Stop) {
                    this.clearTimer();
                }
            }, 100);
        }
    }

    public ngOnDestroy(): void {
        this.clearTimer();
    }

    public getSeconds(): string {
        if (this.timer !== null) {
            return Math.round(this.timer.Current) + 's';
        } else {
            return '?s';
        }
    }

    public getPercentage(): string {
        if (this.timer !== null) {
            return (this.timer.Current / this.timer.Max) * 100 + '%';
        } else {
            return '100%';
        }
    }

    public clearTimer(): void {
        clearInterval(this.intervalId);
    }
}
