/**
 * completedGamesHandler
 */
import { Injectable } from '@angular/core';
import { ProfileHandler } from './profileHandler';
import { AchievementService, IAchievement } from '../../achievement.service';
import { Profile } from '../../profile/profile';

@Injectable()
export class CompletedGamesHandler extends ProfileHandler {

    constructor( private achievementService: AchievementService ) {
        super();
    }

    public getAchieved( profile: Profile, gainedAchievements: IAchievement[] ) {
        let achievements = [];
        if (profile.completedGames >= 1 && !this.hasAchievement(
                gainedAchievements, 'firstGame')) {
            achievements.push(this.achievementService.getAchievementByKey('firstGame'));
        }
        if (profile.completedGames >= 50 && !this.hasAchievement(
                gainedAchievements, 'fiftyGames')) {
            achievements.push(this.achievementService.getAchievementByKey('fiftyGames'));
        }
        if (profile.completedGames >= 100 && !this.hasAchievement(
                gainedAchievements, 'hundredGames')) {
            achievements.push(this.achievementService.getAchievementByKey('hundredGames'));
        }
        return achievements;
    }
}
