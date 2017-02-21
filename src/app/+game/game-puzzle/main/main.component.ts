/**
 * main.component
 */

import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { GameService, Tile, gameWon, IGameState } from '../service';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'app-game-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})

export class GameMainComponent implements OnInit, AfterContentInit, OnDestroy {

    public tiles$: Observable<Tile[]>;
    public gameState: IGameState;

    private gameWonSub: Subscription;
    private gameStateSub: Subscription;

    constructor( private store: Store<any>,
                 private gameService: GameService ) {
    }

    public ngOnInit(): void {
        this.tiles$ = this.store.select('tiles');
        this.gameStateSub = this.store.select('gameState').subscribe(
            ( data: IGameState ) => this.gameState = data
        );
        this.gameWonSub = this.tiles$
            .let(gameWon())
            .distinctUntilChanged() // Use distinctUntilChanged to check if the gameWon has changed
            .subscribe(
                ( data: boolean ) => this.gameService.setGameWon(data)
            );
    }

    public ngAfterContentInit(): void {
        let tileSize;
        if (window.innerWidth > window.innerHeight) {
            /** Size for large screens */
            if (window.innerWidth < 600) {
                tileSize = Math.floor((window.innerHeight - 230) / this.gameState.gameSize);
            } else {
                tileSize = Math.floor((window.innerHeight - 200) / this.gameState.gameSize);
            }
        } else {
            /** Size for mobile screens */
            if (window.innerHeight < 500) {
                tileSize = Math.floor((window.innerHeight - 90) / this.gameState.gameSize);
            } else {
                tileSize = Math.floor((window.innerWidth - 50) / this.gameState.gameSize);
            }
        }

        this.gameService.setGameTileSize(tileSize);
        return;
    }

    public ngOnDestroy(): void {
        if (this.gameWonSub) {
            this.gameWonSub.unsubscribe();
        }

        if (this.gameStateSub) {
            this.gameStateSub.unsubscribe();
        }

        return;
    }

    public moveTile( tile: Tile ): void {
        if (this.gameState.gameWon || this.gameState.gameOver) {
            return;
        }

        this.gameService.moveTile(tile);
        return;
    }

    public shuffleGame(): void {
        this.gameService.newGame();
        return;
    }

    public selectPhoto( photo: string ): void {
        this.gameService.selectPhoto(photo);
        return;
    }
}
