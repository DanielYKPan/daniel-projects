/**
 * game-state.component
 */

import {
    Component, OnInit, Input, ChangeDetectionStrategy, trigger,
    transition, style, animate
} from '@angular/core';

@Component({
    selector: 'app-game-memory-state',
    templateUrl: './game-state.component.html',
    styleUrls: ['./game-state.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('panelState', [
            transition('void => *', [
                style({opacity: 0, transform: 'translateY(100%)'}),
                animate('600ms ease-out')
            ])
        ]),
    ]
})

export class GameStateComponent implements OnInit {

    @Input() public moves: number = 0;

    constructor() {
    }

    public ngOnInit(): void {
    }

}
