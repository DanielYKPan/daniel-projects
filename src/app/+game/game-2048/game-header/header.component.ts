/**
 * header.component
 */

import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-game-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GameHeaderComponent implements OnInit {

    @Output() public onNewGameBtnClick = new EventEmitter<boolean>();

    constructor( private router: Router,
                 private route: ActivatedRoute ) {
    }

    public ngOnInit(): void {
    }

    public newGame(): void {
        if (this.router.url === '/game/2048') {
            this.onNewGameBtnClick.emit(true);
        } else {
            this.router.navigate(['./'], {relativeTo: this.route});
        }
    }

    public checkAbout() {
        this.router.navigate(['./about'], {relativeTo: this.route});
    }
}
