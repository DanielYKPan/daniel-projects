/**
 * game-about.component
 */

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-game-about',
    templateUrl: 'game-about.component.html',
    styleUrls: ['./game-about.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameAboutComponent implements OnInit {

    public socialBtns: Array<{path: string, href: string}> = [
        {
            path: '/assets/img/game/social/github.svg',
            href: 'https://github.com/DanielYKPan/ng2-snake'
        },
        {
            path: '/assets/img/game/social/twitter.svg',
            href: 'https://twitter.com/DanielYKPan'
        },
        {
            path: '/assets/img/game/social/paper-plane.svg',
            href: 'mailto:myron.yk.pan@gmail.com'
        },
    ];

    constructor() {
    }

    public ngOnInit() {
    }
}
