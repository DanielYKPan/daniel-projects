/**
 * game-name.component
 */

import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-game-name',
    styleUrls: [
        'game-name.component.scss'
    ],
    templateUrl: 'game-name.component.html',
})
export class GameNameComponent implements OnInit {

    @Input() public game: any;

    public gameActive: boolean = false;

    constructor() {
    }

    public ngOnInit() {
    }

    public setActive( active: boolean ): void {
        this.gameActive = active;
    }
}
