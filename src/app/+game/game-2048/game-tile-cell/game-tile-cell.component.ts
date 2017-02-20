/**
 * game-tile-cell.component
 */

import {
    Component, OnInit, ElementRef, Renderer, Input, trigger, transition,
    animate, style, keyframes, ChangeDetectionStrategy, OnChanges, SimpleChanges
} from '@angular/core';
import { Tile, IGameState } from '../service';

@Component({
    selector: 'game-tile-cell',
    templateUrl: './game-tile-cell.component.html',
    styleUrls: ['./game-tile-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('mergedState', [
            transition('unmerged => merged', [
                animate('200ms', keyframes([
                    style({transform: 'scale(1)', offset: 0}),
                    style({transform: 'scale(1.4)', offset: 0.5}),
                    style({transform: 'scale(1)', offset: 1.0})
                ]))
            ]),
            transition('void => unmerged', [
                style({opacity: 0, transform: 'scale(0)'}),
                animate(300, style({opacity: 1, transform: 'scale(1)'}))
            ]),
        ])
    ]
})

export class GameTileCellComponent implements OnInit, OnChanges {

    @Input() public tile: Tile;
    @Input() public gameState: IGameState;

    constructor( private element: ElementRef,
                 private renderer: Renderer ) {
    }

    public ngOnInit(): void {
        this.setElementSize();
        this.setElementTransform();
    }

    public ngOnChanges( changes: SimpleChanges ) {
        if (changes['tile']) {
            let preT = changes['tile'].previousValue;
            let curT = changes['tile'].currentValue;

            if (curT.coordination && preT.coordination &&
                (curT.coordination.x !== preT.coordination.x ||
                curT.coordination.y !== preT.coordination.y)) {
                this.setElementTransform();
            }
        }
    }

    private setElementSize() {
        let padding = this.gameState.tileSize * 0.04;
        this.renderer.setElementStyle(
            this.element.nativeElement,
            'padding',
            padding + 'px'
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
        this.renderer.setElementStyle(
            this.element.nativeElement,
            'font-size',
            this.gameState.fontSize + 'px'
        );
    }

    private setElementTransform(): void {
        let tX = this.gameState.tileSize * this.tile.coordination.x;
        let tY = this.gameState.tileSize * this.tile.coordination.y;
        this.renderer.setElementStyle(
            this.element.nativeElement,
            'transform',
            'translate(' + tX + 'px,' + tY + 'px' + ')'
        );
    }
}
