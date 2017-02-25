/**
 * game.component
 */

import { Component, OnInit } from '@angular/core';
import { GameService } from './service/game.service';

@Component({
    selector: 'app-game-memory',
    templateUrl: 'game.component.html',
    styleUrls: ['./game.component.scss'],
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
