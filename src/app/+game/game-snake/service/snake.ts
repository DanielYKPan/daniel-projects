/**
 * snake
 */
import { KeyCode } from './keyboard.service';

export class Snake {

    private directions = {
        Left: [-1, 0],
        Up: [0, -1],
        Right: [1, 0],
        Down: [0, 1]
    };

    /* Property x */
    private x: number;

    get X(): number {
        return this.x;
    }

    /* Property y */
    private y: number;

    get Y(): number {
        return this.y;
    }

    /* Property direction */
    private direction: KeyCode;

    get Direction(): KeyCode {
        return this.direction;
    }

    set Direction( direction: KeyCode ) {
        this.direction = direction;
    }

    /* Property speed */
    private speed: number;

    get Speed(): number {
        return this.speed;
    }

    /* Property segments */
    private segments: Array<{x: number, y: number}>;

    get Segments(): Array<{x: number, y: number}> {
        return this.segments;
    }

    private growSegments: number;

    private moveDelay: number;

    constructor() {
        this.moveDelay = 0;
        this.growSegments = 0;
        this.segments = [];
    }

    public init( x: number, y: number,
                 direction: KeyCode, speed: number,
                 numSegments: number ): void {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.speed = speed;
        this.moveDelay = 0;
        this.growSegments = 0;

        this.segments = [];
        for (let i = 0; i < numSegments; i++) {
            this.segments.push({
                x: this.x - i * this.directions[KeyCode[direction]][0],
                y: this.y - i * this.directions[KeyCode[direction]][1]
            });
        }
    }

    public tryMove( dt: number ): boolean {
        this.moveDelay += dt;
        let maxMoveDelay = 1 / this.speed;
        return this.moveDelay > maxMoveDelay;
    }

    public nextMove(): {x: number, y: number} {
        let nextX = this.x + this.directions[KeyCode[this.direction]][0];
        let nextY = this.y + this.directions[KeyCode[this.direction]][1];
        return {x: nextX, y: nextY};
    }

    public move(): void {
        let nextPosition = this.nextMove();
        this.x = nextPosition.x;
        this.y = nextPosition.y;

        // get the last segment of the snake
        let lastSegment = this.segments[this.segments.length - 1];

        // Grow a segment if needed
        if (this.growSegments > 0) {
            this.segments.push({x: lastSegment.x, y: lastSegment.y});
            this.growSegments--;
        }

        // move every segment to the position of its previous position
        for (let i = this.segments.length - 1; i >= 1; i--) {
            this.segments[i].x = this.segments[i - 1].x;
            this.segments[i].y = this.segments[i - 1].y;
        }

        // set the first segment
        this.segments[0].x = this.x;
        this.segments[0].y = this.y;

        // reset moveDelay
        this.moveDelay = 0;
    }

    public grow(): void {
        this.growSegments++;
    }
}
