/**
 * game-board.component
 */

import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Tile, GameState, IGameStatic, GameService } from '../service';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-game-memory-board',
    templateUrl: 'game-board.component.html',
    styleUrls: ['game-board.component.scss'],
})
export class GameBoardComponent implements OnInit, AfterViewInit, OnDestroy {

    public prepareTime: string;
    public tiles$: Observable<Tile[]>;
    public tileHeight: number;
    public tileWidth: number;
    public tilePadding: number;
    public gameStatic: IGameStatic;

    @ViewChild('board') private board: ElementRef;
    private timeoutId: number = 0;
    private intervalId: number = 0;
    private selectGameStaticSub: Subscription;

    constructor( private store: Store<any>,
                 private gameService: GameService ) {
    }

    public ngOnInit() {
        this.tiles$ = this.store.select('tiles');
        this.gameService.newGame();
        this.selectGameStaticSub = this.store.select('gameStatic').subscribe(
            ( data: IGameStatic ) => {
                this.gameStatic = data;
                if (data.gameState === GameState.Prepare) {
                    this.startCountDown();
                }
            }
        );
    }

    public ngAfterViewInit(): void {
        let boardWidth = this.board.nativeElement.offsetWidth - 10;
        this.tileWidth = boardWidth / 6;
        this.tilePadding = this.tileWidth * 0.1 < 8 ? this.tileWidth * 0.1 : 8;
        this.tileHeight = this.tileWidth * 10 / 9;
    }

    public ngOnDestroy(): void {
        this.clearTimer();
        this.clearInterval();
        this.selectGameStaticSub.unsubscribe();
    }

    public flipCard( tile: Tile ): void {
        let shouldCheckMarch = this.gameService.revealTile(tile);

        if (shouldCheckMarch) {
            this.clearTimer();
            this.timeoutId = window.setTimeout(() => {
                this.gameService.checkMatch(tile);
            }, 500);
        }
    }

    public trackByFn( index, item ) {
        return item.Id;
    }

    private startCountDown() {
        this.clearInterval();
        let time = 5;
        this.prepareTime = time.toString();
        this.intervalId = window.setInterval(() => {
            time -= 1;
            if (time > 0) {
                this.prepareTime = time.toString();
            } else {
                this.prepareTime = 'GO';
                this.clearInterval();
                this.gameService.setGameState(GameState.Start);
                this.gameService.flipAll(false);
            }
        }, 1300);
    }

    private clearTimer(): void {
        clearTimeout(this.timeoutId);
    }

    private clearInterval(): void {
        clearInterval(this.intervalId);
    }
}
