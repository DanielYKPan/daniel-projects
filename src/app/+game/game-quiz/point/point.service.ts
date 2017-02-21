/**
 * point.service
 */

import { Injectable } from '@angular/core';
import { ProfileService } from '../achievement';
import { IBooster } from '../booster';
import { Subject } from 'rxjs';

@Injectable()
export class PointService {

    public totalPointsChange = new Subject<number>();

    constructor( private profileService: ProfileService ) {
    }

    public getTotalPoints(): number {
        let points = this.profileService.getProfile().points;
        return points === null ? 0 : points;
    }

    public isBuyable( booster: IBooster ): boolean {
        let points = this.profileService.getProfile().points;
        return points - booster.cost > 0;
    }

    public onBoosterBought( booster: IBooster ): void {
        let profile = this.profileService.getProfile();
        profile.points -= booster.cost;
        this.profileService.saveProfile(profile);
        this.totalPointsChange.next(profile.points);
    }
}
