/**
 * game-board.component
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
    GameLevelService, GameService, Tile,
    ILevel, IGameStatus, gameStatus, LEVELS
} from '../service';

@Component({
    selector: 'app-game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.scss']
})

export class GameBoardComponent implements OnInit, OnDestroy {

    public tiles$: Observable<Tile[]>;
    public chosenLevel: ILevel;
    public levels: ILevel[];

    private gameStatusSub: Subscription;

    constructor( public gameService: GameService,
                 private gameLevel: GameLevelService,
                 private store: Store<any> ) {
    }

    public ngOnInit(): void {
        this.newGame();
        this.levels = LEVELS;
        this.tiles$ = this.store.select('tiles');
        this.gameStatusSub = this.tiles$
            .let(gameStatus())
            .distinctUntilChanged(
                ( a: IGameStatus, b: IGameStatus ) => {
                    return a.gameWon === b.gameWon &&
                        a.gameOver === b.gameOver &&
                        a.flags === b.flags;
                }) // Use distinctUntilChanged to check if the gameStatus has changed
            .subscribe(
                ( data: IGameStatus ) => this.gameService.changeGameStatus(data)
            );
    }

    public ngOnDestroy(): void {
        if (this.gameStatusSub) {
            this.gameStatusSub.unsubscribe();
        }
    }

    public newGame(): void {
        this.gameService.newGame();
        this.chosenLevel = this.gameLevel.GameLevel;
    }

    public clickTile( tile: Tile, isRightClick: boolean = false ): void {
        if (!this.gameService.Status.gameStart) {
            this.gameService.startGame();
        }
        isRightClick ? this.gameService.coverTile(tile) : this.gameService.clickTile(tile);
    }

    public changeGameLevel( level: ILevel ): void {
        this.gameLevel.GameLevel = level;
        this.newGame();
    }

    public setGameTime( time: number ): void {
        this.gameService.setBestRecord(time);
        return;
    }
}
