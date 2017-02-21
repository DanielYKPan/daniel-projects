/**
 * control.component
 */

import {
    Component, OnInit, Output,
    EventEmitter, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'app-game-control',
    templateUrl: './control.component.html',
    styleUrls: ['./control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GameControlComponent implements OnInit {

    @Output() public onShuffleBtnClick = new EventEmitter<boolean>();

    constructor() {
    }

    public ngOnInit(): void {
    }
}
