/**
 * shared.module
 */

import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CenterBtnComponent } from './center-btn';
import { SocialBtnComponent } from './social-btn';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
    ],
    declarations: [
        CenterBtnComponent,
        SocialBtnComponent,
    ],
    exports: [
        CommonModule,
        FormsModule,
        CenterBtnComponent,
        SocialBtnComponent,
    ],
    providers: []
})
export class GameSharedModule {
}
