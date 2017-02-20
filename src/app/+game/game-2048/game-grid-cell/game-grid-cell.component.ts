/**
 * game-grid-cell.component
 */

import {
    Component, OnInit, ElementRef,
    Renderer, ChangeDetectionStrategy, Input
} from '@angular/core';
import { IGameState } from '../service';

@Component({
    selector: 'app-game-cell',
    templateUrl: './game-grid-cell.component.html',
    styleUrls: ['./game-grid-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GameGridCellComponent implements OnInit {

    @Input() public gameState: IGameState;

    constructor( private element: ElementRef,
                 private renderer: Renderer ) {
    }

    public ngOnInit(): void {
        this.renderer.setElementStyle(
            this.element.nativeElement,
            'padding',
            (this.gameState.tileSize * 0.04) + 'px'
        );
        this.renderer.setElementStyle(
            this.element.nativeElement,
            'width',
            this.gameState.tileSize + 'px'
        );
        this.renderer.setElementStyle(
            this.element.nativeElement,
            'height',
            this.gameState.tileSize + 'px'
        );
    }
}
