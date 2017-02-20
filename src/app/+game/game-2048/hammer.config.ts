/**
 * hammer.config
 */

import { HammerGestureConfig } from '@angular/platform-browser';

export class MyHammerConfig extends HammerGestureConfig  {
    // https://github.com/hammerjs/hammer.js/issues/1014
    // http://stackoverflow.com/questions/35728451/using-mobile-events-in-angular2
    public buildHammer(element: HTMLElement) {
        let mc = new Hammer(element);

        mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

        for (let eventName in this.overrides) {
            mc.get(eventName).set(this.overrides[eventName]);
        }

        return mc;
    }
}
