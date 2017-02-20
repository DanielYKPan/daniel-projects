/**
 * game-over-board.component
 */

import {
    Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter,
    trigger, state, style, transition, animate
} from '@angular/core';

@Component({
    selector: 'game-over-board',
    styleUrls: ['./game-over-board.component.scss'],
    template: `
<div class="wrapper" [@messageState]="'in'">
    <div class="content">
        <h1>Game Over!</h1>
        <button class="restart-btn" (click)="restartBtnClick.next(true)">Try Again</button>
    </div>
</div>
`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('messageState', [
            state('in', style({opacity: 1})),
            transition('void => in', [
                style({opacity: 0}),
                animate('300ms 1s ease-in')
            ])
        ])
    ]
})

export class GameOverBoardComponent implements OnInit {

    @Output() public restartBtnClick = new EventEmitter<boolean>();

    constructor() {
    }

    public ngOnInit(): void {
    }
}
