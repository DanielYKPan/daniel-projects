/**
 * chooser.component
 */

import { Component, OnInit } from '@angular/core';
import { QuizThemeService, QuizTheme } from '../quiz-game';

@Component({
    selector: 'app-quiz-chooser',
    templateUrl: './chooser.component.html',
    styleUrls: ['./chooser.component.scss']
})

export class QuizChooserComponent implements OnInit {

    public themes: QuizTheme[];

    constructor( private themeService: QuizThemeService ) {
    }

    public ngOnInit(): void {
        this.themes = this.themeService.findAll();
    }
}
