/**
 * board.component
 */

import {
    Component, OnInit, ViewChild, ElementRef, Renderer, Input, Output, EventEmitter,
    ChangeDetectionStrategy
} from '@angular/core';
import { Tile, IGameState } from '../service';

@Component({
    selector: 'app-game-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class GameBoardComponent implements OnInit {

    @Input() public tiles: Tile[];
    @Input() public gameState: IGameState;
    @Output() public onClickTile = new EventEmitter<Tile>();
    @ViewChild('board') public board: ElementRef;
    @ViewChild('background') public background: ElementRef;

    public showNumbers: boolean = false;

    constructor( private renderer: Renderer ) {
    }

    public ngOnInit(): void {
        let boardWidth = this.gameState.tileSize * this.gameState.gameSize;
        this.renderer.setElementStyle(
            this.board.nativeElement,
            'width',
            boardWidth + 'px'
        );
        this.renderer.setElementStyle(
            this.board.nativeElement,
            'height',
            boardWidth + 'px'
        );
        this.renderer.setElementStyle(
            this.background.nativeElement,
            'background-size',
            boardWidth + 'px ' + boardWidth + 'px'
        );
    }

    public clickTile( tile ): void {
        this.onClickTile.emit(tile);
    }

    public trackByFn( index, item ) {
        return item.Id;
    }
}
