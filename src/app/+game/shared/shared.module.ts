/**
 * shared.module
 */

import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CenterBtnComponent } from './center-btn';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
    ],
    declarations: [
        CenterBtnComponent,
    ],
    exports: [
        CommonModule,
        FormsModule,
        CenterBtnComponent,
    ],
    providers: []
})
export class GameSharedModule {
}
