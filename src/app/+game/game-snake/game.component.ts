/**
 * game.component
 */

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IGameState, Fruit, FruitType } from './service';

@Component({
    selector: 'app-game',
    templateUrl: 'game.component.html',
    styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {

    public gameState: Observable<IGameState>;
    public fruits: Array<{name: string, score: number}>;

    constructor( private store: Store<any> ) {
    }

    public ngOnInit() {
        this.gameState = this.store.select('gameState');
        this.fruits = [];
        for (let type of Fruit.all) {
            let fruit = {name: FruitType[type], score: type};
            this.fruits.push(fruit);
        }
    }
}
