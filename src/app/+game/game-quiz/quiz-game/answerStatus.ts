/**
 * answerStatus
 */

import { QuizTheme } from './quizTheme';

export class AnswerStatus {
    public correct: boolean;
    public theme: QuizTheme;

    constructor( correct: boolean, theme: QuizTheme ) {
        this.correct = correct;
        this.theme = theme;
    }
}
