/**
 * header.component
 */

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-game-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GameHeaderComponent implements OnInit {
    constructor() {
    }

    public ngOnInit(): void {
    }
}
