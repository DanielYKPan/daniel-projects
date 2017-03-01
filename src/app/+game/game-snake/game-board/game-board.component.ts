/**
 * game-board.component
 */

import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameService, KeyboardService, KeyCode, IGameState, Fruit, FruitType } from '../service';
import { Subscription, Observable } from 'rxjs';

@Component({
    selector: 'app-game-board',
    templateUrl: 'game-board.component.html',
    styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit, OnDestroy {

    public gameState: Observable<IGameState>;
    public fruits: Array<{name: string, score: number}>;

    @ViewChild('board') private board: ElementRef;

    private arrowsSub: Subscription;

    constructor( private gameService: GameService,
                 private keyboardService: KeyboardService,
                 private store: Store<any> ) {
    }

    public ngOnInit() {

        this.gameState = this.store.select('gameState');
        this.fruits = [];
        for (let type of Fruit.all) {
            let fruit = {name: FruitType[type], score: type};
            this.fruits.push(fruit);
        }

        let board = this.board.nativeElement;
        this.gameService.init(board);

        this.arrowsSub = this.keyboardService.arrows.subscribe(
            ( data: KeyCode ) => this.gameService.arrowDown(data)
        );
    }

    public ngOnDestroy(): void {
        this.arrowsSub.unsubscribe();
    }

    public clickKeyBoard( keyCode: number ): void {
        this.keyboardService.enter(keyCode);
    }
}
