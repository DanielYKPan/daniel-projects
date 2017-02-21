/**
 * achievement.service
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

export interface IAchievement {
    key: string;
    img: string;
    name: string;
    description: string;
    points: number;
    gained?: boolean;
}

@Injectable()
export class AchievementService {

    private url: string = 'assets/data/quiz/achievements.json';
    private achievements: IAchievement[];

    constructor( private http: Http ) {
        this.http.get(this.url).map(( res ) => res.json()).subscribe(
            ( data: IAchievement[] ) => this.achievements = data
        );
    }

    public getAvailableAchievements(): Observable<IAchievement[]> {
        return this.http.get(this.url).map(( res ) => res.json());
    }

    public getAchievementByKey( key: string ): IAchievement {
        return this.achievements.find(
            ( achievement: IAchievement ) => achievement.key === key
        );
    }

    public pushAchievementToLocalStorage( achievement: IAchievement ): void {
        let tmpAchievements = this.getAchievementsFromLocalStorage();
        if (tmpAchievements.indexOf(achievement) === -1) {
            tmpAchievements.push(achievement);
            localStorage.setItem('achievements', JSON.stringify(tmpAchievements));
        }
    }

    public getAchievementsFromLocalStorage(): IAchievement[] {
        return JSON.parse(localStorage.getItem('achievements') || '[]');
    }
}
