/**
 * center-btn.component
 */

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-game-center-btn',
    templateUrl: 'center-btn.component.html',
})
export class CenterBtnComponent implements OnInit {

    @Input() public color: string = '#000000';

    constructor( private router: Router ) {
    }

    public ngOnInit() {
    }

    public goToCenter() {
        this.router.navigate(['./game']);
    }
}
