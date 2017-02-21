/**
 * comboHandler
 */
import { Injectable } from '@angular/core';
import { ProfileHandler } from './profileHandler';
import { AchievementService, IAchievement } from '../../achievement.service';
import { Profile } from '../../profile/profile';

@Injectable()
export class ComboHandler extends ProfileHandler {

    constructor( private achievementService: AchievementService ) {
        super();
    }

    public getAchieved( profile: Profile, gainedAchievements: IAchievement[] ) {
        let achievements = [];
        if (profile.consecutively >= 10 && !this.hasAchievement(
                gainedAchievements, 'tenConsecutivelyCorrectAnswers')) {
            achievements.push(
                this.achievementService.getAchievementByKey('tenConsecutivelyCorrectAnswers')
            );
        }
        if (profile.consecutively >= 25 && !this.hasAchievement(
                gainedAchievements, 'twentyfiveConsecutivelyCorrectAnswers')) {
            achievements.push(
                this.achievementService.getAchievementByKey('twentyfiveConsecutivelyCorrectAnswers')
            );
        }
        if (profile.consecutively >= 50 && !this.hasAchievement(
                gainedAchievements, 'fiftyConsecutivelyCorrectAnswers')) {
            achievements.push(
                this.achievementService.getAchievementByKey('fiftyConsecutivelyCorrectAnswers')
            );
        }
        return achievements;
    }
}
