/**
 * multiAchievementHandler
 */
import { Injectable } from '@angular/core';
import { ProfileHandler } from './profileHandler';
import { AchievementService, IAchievement } from '../../achievement.service';
import { Profile } from '../../profile/profile';
import { QuizThemeService } from '../../../quiz-game/quizTheme.service';

@Injectable()
export class MultiAchievementHandler extends ProfileHandler {

    constructor( private achievementService: AchievementService,
                 private themeService: QuizThemeService ) {
        super();
    }

    public getAchieved( profile: Profile, gainedAchievements: IAchievement[] ) {
        let achievements = [];
        let geek = this.hasAchievement(gainedAchievements, 'moviesMaster') &&
            this.hasAchievement(gainedAchievements, 'literatureMaster') &&
            this.hasAchievement(gainedAchievements, 'scienceMaster') &&
            this.hasAchievement(gainedAchievements, 'videogamesMaster');

        let beater = this.themeService.findAll().filter(
            ( theme ) => !this.hasAchievement(gainedAchievements, theme.code + 'Master')
        );

        if (geek && !this.hasAchievement(gainedAchievements, 'geek')) {
            achievements.push(this.achievementService.getAchievementByKey('geek'));
        }
        if (beater.length === 0 && !this.hasAchievement(gainedAchievements, 'beater')) {
            achievements.push(this.achievementService.getAchievementByKey('beater'));
        }
        return achievements;
    }
}
