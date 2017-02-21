/**
 * about.component
 */

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-game-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GameAboutComponent implements OnInit {

    public socialBtns: Array<{path: string, href: string}> = [
        {
            path: '/assets/img/game/minesweeper/github.svg',
            href: 'https://github.com/DanielYKPan'
        },
        {
            path: '/assets/img/game/minesweeper/twitter.svg',
            href: 'https://twitter.com/DanielYKPan'
        },
        {
            path: '/assets/img/game/minesweeper/paper-plane.svg',
            href: 'mailto:myron.yk.pan@gmail.com'
        },
    ];

    constructor() {
    }

    public ngOnInit(): void {
    }
}
