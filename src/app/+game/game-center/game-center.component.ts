/**
 * game-center.component
 */

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-game-center',
    styleUrls: [
        'game-center.component.scss'
    ],
    templateUrl: 'game-center.component.html'
})
export class GameCenterComponent implements OnInit {

    public games: any = [
        {
            name: '2048',
            slug: '2048',
            img: '2048/logo-1.png',
            color: '#f5b600'
        },
        {
            name: 'Minesweeper',
            slug: 'minesweeper',
            img: 'minesweeper/bomb_green.png',
            color: '#43d000'
        },
        {
            name: 'Trivia Quiz',
            slug: 'quiz',
            img: 'quiz/quiz-logo.png',
            color: '#ec6e1a'
        },
        {
            name: 'Puzzle',
            slug: 'puzzle',
            img: 'puzzle/puzzle-logo.png',
            color: '#CC37FF'
        },
        {
            name: 'Memory',
            slug: 'memory',
            img: 'memory/memory-logo.png',
            color: '#D67096'
        },
    ];

    constructor() {
    }

    public ngOnInit() {
    }
}
