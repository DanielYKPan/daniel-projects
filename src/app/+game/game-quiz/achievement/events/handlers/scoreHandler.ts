/**
 * scoreHandler
 */

import { Injectable } from '@angular/core';
import { ProfileHandler } from './profileHandler';
import { AchievementService, IAchievement } from '../../achievement.service';
import { Profile } from '../../profile/profile';
import { AnswerStatus, QuizStatus } from '../../../quiz-game';
import { QuizThemeKind } from '../../../quiz-game/quizThemeKind';

@Injectable()
export class ScoreHandler extends ProfileHandler {

    constructor( private achievementService: AchievementService ) {
        super();
    }

    public getAchieved( profile: Profile,
                        gainedAchievements: IAchievement[],
                        answer: AnswerStatus,
                        completed: QuizStatus ) {
        let achievements = [];

        if (completed !== null) {
            if (completed.correct === 0 && !this.hasAchievement(gainedAchievements, 'zeroScore')) {
                achievements.push(this.achievementService.getAchievementByKey('zeroScore'));
            }
            if (completed.correct === 1 && !this.hasAchievement(gainedAchievements, 'oneScore')) {
                achievements.push(this.achievementService.getAchievementByKey('oneScore'));
            }
            if (completed.correct < 5
                && completed.theme.kind === QuizThemeKind.KIDS
                && !this.hasAchievement(gainedAchievements, 'kindergarten')) {
                achievements.push(this.achievementService.getAchievementByKey('kindergarten'));
            }
        }

        if (profile.wrong >= 20 && !this.hasAchievement(gainedAchievements, 'loser')) {
            achievements.push(this.achievementService.getAchievementByKey('loser'));
        }
        if (answer !== null) {
            if (answer.correct && !this.hasAchievement(gainedAchievements, 'newbie')) {
                achievements.push(this.achievementService.getAchievementByKey('newbie'));
            }
            if (!answer.correct && !this.hasAchievement(gainedAchievements, 'fail')) {
                achievements.push(this.achievementService.getAchievementByKey('fail'));
            }
        }

        return achievements;
    }
}
