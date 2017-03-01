/**
 * game-inform.component
 */

import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-game-inform',
    templateUrl: 'game-inform.component.html',
    styleUrls: ['./game-inform.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameInformComponent implements OnInit {

    @Input() public fruits: Array<{name: string, score: number}>;
    @Input() public scores: number;
    @Input() public best: number;

    constructor() {
    }

    public ngOnInit() {
    }
}
