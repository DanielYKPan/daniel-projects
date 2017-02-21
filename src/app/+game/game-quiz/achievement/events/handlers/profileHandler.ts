/**
 * profileHandler
 */

import { Injectable } from '@angular/core';
import { IAchievement } from '../../achievement.service';

@Injectable()
export class ProfileHandler {
    constructor() {
    }

    public hasAchievement( achievements: IAchievement[], key: string ): boolean {
        return achievements.some(( achievement: IAchievement ) => achievement.key === key);
    }
}
