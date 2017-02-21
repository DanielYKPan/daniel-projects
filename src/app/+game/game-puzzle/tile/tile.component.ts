/**
 * tile.component
 */

import {
    Component, OnInit, ElementRef, Renderer, Input,
    OnChanges, SimpleChanges, ChangeDetectionStrategy
} from '@angular/core';
import { Tile, indexToCoordination, IGameState } from '../service';

@Component({
    selector: 'app-game-tile',
    templateUrl: './tile.component.html',
    styleUrls: ['./tile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameTileComponent implements OnInit, OnChanges {

    @Input() public tile: Tile;
    @Input() public gameState: IGameState;
    @Input() public showNumbers: boolean;

    public styles: any;

    constructor( private element: ElementRef,
                 private renderer: Renderer ) {
    }

    public ngOnInit(): void {
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
        this.setElementStyle();
        this.setElementTransform();
    }

    public ngOnChanges( changes: SimpleChanges ): void {
        if (changes['tile']) {
            let preT = changes['tile'].previousValue;
            let curT = changes['tile'].currentValue;

            if (curT.Coordination &&
                preT.Coordination &&
                (curT.Coordination.x !== preT.Coordination.x ||
                curT.Coordination.y !== preT.Coordination.y)) {
                this.setElementTransform();
            }
        }
    }

    private setElementTransform(): void {
        let tX = this.gameState.tileSize * this.tile.Coordination.x;
        let tY = this.gameState.tileSize * this.tile.Coordination.y;
        this.renderer.setElementStyle(
            this.element.nativeElement,
            'transform',
            'translate(' + tX + 'px,' + tY + 'px' + ')'
        );
    }

    private  setElementStyle(): void {
        let imageCoordination = indexToCoordination(this.tile.Value, this.gameState.gameSize);
        this.styles = {
            backgroundImage: 'url(/assets/img/game/puzzle/' + this.gameState.gameImage + ')',
            backgroundPosition: (-this.gameState.tileSize * imageCoordination.x) + 'px ' +
                                (-this.gameState.tileSize * imageCoordination.y) + 'px',
            backgroundSize: this.gameState.tileSize * this.gameState.gameSize + 'px ' +
                            this.gameState.tileSize * this.gameState.gameSize + 'px'
        };
    }
}
