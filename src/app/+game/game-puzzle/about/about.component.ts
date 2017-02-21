/**
 * about.component
 */

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-game-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class GameAboutComponent implements OnInit {
    constructor() {
    }

    public ngOnInit(): void {
    }
}
