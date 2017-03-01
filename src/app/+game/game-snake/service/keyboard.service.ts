/**
 * keyboard.service
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

export enum KeyCode {
    Spacebar = 32,
    Left = 37,
    Up = 38,
    Right = 39,
    Down = 40,
}

@Injectable()
export class KeyboardService {

    public keyboardStream = new Subject<number>();

    public arrows: Observable<KeyCode> =
        this.keyboardStream
            .filter(( keyCode: number ) => KeyCode[keyCode] != null)
            .map(( keyCode: number ) => keyCode);

    constructor() {
    }

    public enter( keyCode: number ) {
        this.keyboardStream.next(keyCode);
    }
}
