/**
 * answerAmountHandler
 */
import { Injectable } from '@angular/core';
import { ProfileHandler } from './profileHandler';
import { AchievementService, IAchievement } from '../../achievement.service';
import { Profile } from '../../profile/profile';

@Injectable()
export class AnswerAmountHandler extends ProfileHandler {

    constructor( private achievementService: AchievementService ) {
        super();
    }

    public getAchieved( profile: Profile, gainedAchievements: IAchievement[] ) {
        return profile.themeProfiles.filter(( subProfile ) => {
            let key = subProfile.theme.code + '100Questions';
            return subProfile.correct >= 100 && !this.hasAchievement(gainedAchievements, key);
        }).map(( subProfile ) => {
            let key = subProfile.theme.code + '100Questions';
            return this.achievementService.getAchievementByKey(key);
        });
    }
}
