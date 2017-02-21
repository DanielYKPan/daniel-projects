/**
 * quizTheme
 */

export class QuizTheme {

    public kind: number;
    public name: string;
    public code: string;
    public color: string;
    public complementaryColor: string;

    constructor( kind: number,
                 name: string,
                 code: string,
                 color: string,
                 complementaryColor: string ) {
        this.kind = kind;
        this.name = name;
        this.code = code;
        this.color = color;
        this.complementaryColor = complementaryColor;
    }
}
