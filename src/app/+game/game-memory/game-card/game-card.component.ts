/**
 * game-card.component
 */

import {
    Component, OnInit, HostListener,
    Input, EventEmitter, Output, ChangeDetectionStrategy
} from '@angular/core';
import { Tile } from '../service/tile';

@Component({
    selector: 'app-game-memory-card',
    templateUrl: 'game-card.component.html',
    styleUrls: ['game-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCardComponent implements OnInit {

    @Input() public tile: Tile;
    @Output() private onCardClick = new EventEmitter<Tile>();

    constructor() {
    }

    public ngOnInit() {
    }

    @HostListener('click')
    public card_onClick() {
        if (!this.tile.Revealed) {
            this.onCardClick.emit(this.tile);
        }
    }
}
