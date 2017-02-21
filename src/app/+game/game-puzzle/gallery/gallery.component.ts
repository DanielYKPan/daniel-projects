/**
 * gallery.component
 */

import {
    Component, OnInit, ChangeDetectionStrategy,
    Input, Output, EventEmitter
} from '@angular/core';
import { IGameState } from '../service';

@Component({
    selector: 'app-game-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class GameGalleryComponent implements OnInit {

    @Input() public gameState: IGameState;
    @Output() public onPhotoSelect = new EventEmitter<string>();

    public photos: string[];

    constructor() {
    }

    public ngOnInit(): void {
        this.photos = [
            'adriana.jpg',
            'cartoon1.jpg',
            'cartoon2.jpg',
            'cartoon3.jpg',
            'dog.jpg',
            'dog2.jpg',
            'romance.jpg',
            'tiger.jpg',
        ];
    }
}
