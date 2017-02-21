/**
 * themeProfile
 */

import { QuizTheme } from '../../quiz-game/quizTheme';

export class ThemeProfile {

    public theme: QuizTheme;
    public consecutively: number;
    public wrong: number;
    public correct: number;
    public completedGames: number;

    constructor( theme?: QuizTheme ) {
        this.theme = theme || null;
    }
}
