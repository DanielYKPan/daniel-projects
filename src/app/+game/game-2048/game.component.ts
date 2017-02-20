/**
 * game.component
 */

import { Component, OnInit } from '@angular/core';
import { GameService } from './service';
@Component({
    selector: 'app-game-2048',
    styleUrls: ['game.component.scss'],
    templateUrl: 'game.component.html'
})
export class GameComponent implements OnInit {

    constructor( private gameService: GameService ) {
    }

    public ngOnInit() {
    }

    public newGame() {
        this.gameService.newGame();
    }
}
