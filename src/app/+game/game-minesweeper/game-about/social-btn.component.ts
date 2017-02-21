/**
 * social-btn.component
 */

import {
    Component, OnInit, Input, ChangeDetectionStrategy, trigger, transition, animate,
    keyframes, style, HostListener
} from '@angular/core';

@Component({
    selector: 'app-game-about-social',
    template: `
<a [href]="btn.href" [@btnState]="btnSwing" target="_blank">
    <img [src]="btn.path"/>
</a>
`,
    styles: ['img { width: 60px } a {display: block}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('btnState', [
            transition('void => inactive, inactive => active', [
                animate('1000ms', keyframes([
                    style({transform: 'rotate(0)', offset: 0}),
                    style({transform: 'rotate(15deg)', offset: 0.2}),
                    style({transform: 'rotate(-10deg)', offset: 0.4}),
                    style({transform: 'rotate(5deg)', offset: 0.5}),
                    style({transform: 'rotate(-5deg)', offset: 0.8}),
                    style({transform: 'rotate(0deg)', offset: 1.0}),
                ]))
            ])
        ])
    ]
})

export class SocialBtnComponent implements OnInit {

    @Input() public btn: {path: string, href: string};

    public btnSwing: string = 'inactive';

    constructor() {
    }

    public ngOnInit(): void {
    }

    @HostListener('mouseenter')
    public ac_onEnter() {
        this.btnSwing = 'active';
    }

    @HostListener('mouseleave')
    public ac_onLeave() {
        this.btnSwing = 'inactive';
    }
}
