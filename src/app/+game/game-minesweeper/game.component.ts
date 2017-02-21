/**
 * game.component
 */

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GameService } from './service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-game-minesweeper',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GameComponent implements OnInit {

    constructor( private router: Router,
                 private route: ActivatedRoute,
                 private gameService: GameService ) {
    }

    public ngOnInit(): void {
    }

    public newGame() {
        if (this.router.url === '/game/minesweeper') {
            this.gameService.newGame();
        } else {
            this.router.navigate(['./'], {relativeTo: this.route});
        }
    }

    public checkAbout() {
        this.router.navigate(['./about'], {relativeTo: this.route});
    }
}
