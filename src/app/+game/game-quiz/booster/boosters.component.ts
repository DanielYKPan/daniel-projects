/**
 * booster.component
 */

import { Component, OnInit } from '@angular/core';
import { BoosterService, IBooster } from './booster.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'quiz-boosters',
    templateUrl: './boosters.component.html',
    styleUrls: ['./boosters.component.scss']
})

export class QuizBoostersComponent implements OnInit {

    public boosters: Observable<IBooster[]>;

    constructor( private boosterService: BoosterService ) {
    }

    public ngOnInit(): void {
        this.boosters = this.boosterService.getAllBoosters();
    }

    public payForBooster( booster: IBooster ): void {
        this.boosterService.buyBooster(booster);
    }
}
