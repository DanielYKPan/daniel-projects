/**
 * home.component
 */

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-game-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class GameHomeComponent implements OnInit {

    public socialBtns: Array<{path: string, href: string, caption: string}> = [
        {
            path: '/assets/img/game/social/github.svg',
            href: 'https://github.com/DanielYKPan',
            caption: 'Fork me on Github'
        },
        {
            path: '/assets/img/game/social/twitter.svg',
            href: 'https://twitter.com/DanielYKPan',
            caption: 'Check my Twitter'
        },
        {
            path: '/assets/img/game/social/paper-plane.svg',
            href: 'mailto:myron.yk.pan@gmail.com',
            caption: 'Send an Email'
        },
    ];

    constructor() {
    }

    public ngOnInit(): void {
    }
}
