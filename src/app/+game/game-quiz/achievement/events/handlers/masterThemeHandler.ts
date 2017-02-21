/**
 * masterThemeHandler
 */

import { Injectable } from '@angular/core';
import { ProfileHandler } from './profileHandler';
import { AchievementService, IAchievement } from '../../achievement.service';
import { Profile } from '../../profile/profile';
import { AnswerStatus, QuizStatus } from '../../../quiz-game';

@Injectable()
export class MasterThemeHandler extends ProfileHandler {

    constructor( private achievementService: AchievementService ) {
        super();
    }

    public getAchieved( profile: Profile,
                        gainedAchievements: IAchievement[],
                        answer: AnswerStatus,
                        quiz: QuizStatus ) {
        let achievements = [];

        if (quiz !== null) {
            let key = quiz.theme.code + 'Master';

            if (quiz.correct > 8 && !this.hasAchievement(gainedAchievements, key)) {
                achievements.push(this.achievementService.getAchievementByKey(key));
            }
        }

        return achievements;
    }
}
