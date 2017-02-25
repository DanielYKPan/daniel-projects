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
            path: '/assets/img/game/social/github-light.svg',
            href: 'https://github.com/DanielYKPan/ng2-memory'
        },
        {
            path: '/assets/img/game/social/twitter-light.svg',
            href: 'https://twitter.com/DanielYKPan'
        },
        {
            path: '/assets/img/game/social/paper-plane-light.svg',
            href: 'mailto:myron.yk.pan@gmail.com'
        },
    ];

    constructor() {
    }

    public ngOnInit(): void {
    }
}
