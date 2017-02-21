/**
 * quizGame.component
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Timer } from '../timer';
import { QuizTheme } from './quizTheme';
import { QuizThemeService } from './quizTheme.service';
import { QuizStatus } from './quizStatus';
import { AnswerStatus } from './answerStatus';
import { AchievementEventService } from '../achievement';
import { IQuiz, QuizService } from './quiz.service';
import { NotifierService } from 'ng2-yk-notifier';
import { BoosterService, IBooster } from '../booster';

@Component({
    selector: 'app-quiz-game',
    templateUrl: './quizGame.component.html',
    styleUrls: ['./quizGame.component.scss']
})

export class QuizGameComponent implements OnInit, OnDestroy {
    public quizs: IQuiz[];
    public currentQuize: IQuiz;
    public theme: QuizTheme;
    public qNum: number;
    public qAmount: number;
    public timer: Timer;
    public revealAnswer: boolean;

    private status: QuizStatus;
    private getQuestionsSub: Subscription;
    private increaseTimeSub: Subscription;
    private removeChoiceSub: Subscription;
    private timeoutId: number;

    constructor( private route: ActivatedRoute,
                 private router: Router,
                 private notifier: NotifierService,
                 private quizService: QuizService,
                 private themeService: QuizThemeService,
                 private eventService: AchievementEventService,
                 private boosterService: BoosterService ) {
    }

    public ngOnInit(): void {
        let slug = this.route.snapshot.params['slug'];
        this.quizs = this.route.snapshot.data['quizs'];
        this.qNum = 1;
        this.qAmount = this.quizService.QAmount;
        this.theme = this.themeService.findOne(slug);
        this.status = new QuizStatus(this.theme, this.qAmount);
        this.increaseTimeSub = this.boosterService.buyIncreaseTimeBooster.subscribe(
            ( data: IBooster ) => this.addTimeBonus(data)
        );
        this.removeChoiceSub = this.boosterService.buyRemoveChoiceBooster.subscribe(
            ( data: IBooster ) => this.removeChoice(data)
        );
        this.process();
    }

    public ngOnDestroy(): void {
        if (this.getQuestionsSub) {
            this.getQuestionsSub.unsubscribe();
        }

        if (this.timeoutId) {
            this.clearTimer();
        }
    }

    public choiceCharCode( index: number ) {
        return String.fromCharCode(65 + index);
    }

    public checkAnswer( choice?: string ): void {
        if (!this.revealAnswer) {
            this.revealAnswer = true;
        } else {
            return;
        }

        this.handleAnswer(choice);
        this.timer.Stop = true;

        this.timeoutId = window.setTimeout(() => {
            if (this.qNum < this.qAmount) {
                this.qNum += 1;
                this.process();
            } else {
                this.eventService.completedEvent.emit(this.status);
                this.quizService.Status = this.status;
                this.router.navigate(['/game/end']);
            }
        }, 2000);
    }

    private handleAnswer( choice: string ) {
        let answerStatus;
        if (choice == null) {
            this.notifier.error("Too bad, you didn't answer the question in time.", 'Oops!');
            answerStatus = new AnswerStatus(false, this.theme);
            this.status.wrong += 1;
        } else if (this.currentQuize.answer === choice) {
            this.notifier.success('You are awesome!', 'Correct!');
            answerStatus = new AnswerStatus(true, this.theme);
            this.status.correct += 1;
        } else {
            this.notifier.error('That was not the correct answer.', 'Oops!');
            answerStatus = new AnswerStatus(false, this.theme);
            this.status.wrong += 1;
        }
        this.eventService.answeredEvent.emit(answerStatus);
    }

    private process() {
        if (this.timeoutId) {
            this.clearTimer();
        }
        this.revealAnswer = false;
        this.currentQuize = this.quizs[this.qNum - 1];
        this.timer = new Timer(30, 30);
    }

    private clearTimer(): void {
        clearTimeout(this.timeoutId);
    }

    private addTimeBonus( booster: IBooster ): void {
        if (this.revealAnswer) {
            return;
        }

        let diff = Math.round(this.timer.Max - this.timer.Current);
        if (diff > 5) {
            this.timer.Bonus += 5;
        } else {
            this.timer.Bonus += diff;
        }

        this.boosterService.increaseTimeSuccess.emit(booster);
        return;
    }

    private removeChoice( booster: IBooster ) {
        if (this.revealAnswer) {
            return;
        }

        if (this.currentQuize.choices.length <= 2) {
            this.notifier.error(
                'There are only ' + this.currentQuize.choices.length +
                ' answers, guess the right one!',
                'Not enough answers to delete');
        } else {
            let index = Math.floor(Math.random() * this.currentQuize.choices.length);
            while (this.currentQuize.answer === this.currentQuize.choices[index]) {
                index = Math.floor(Math.random() * this.currentQuize.choices.length);
            }
            this.currentQuize.choices.splice(index, 1);
            this.boosterService.removeChoiceSuccess.emit(booster);
        }

        return;
    }
}
