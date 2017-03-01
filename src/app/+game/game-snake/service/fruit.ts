/**
 * fruit
 */

export enum FruitType {
    Apple = 10,
    Grapes = 20,
    Orange = 30,
    Watermelon = 40,
    Pineapple = 50,
}

export class Fruit {

    public static all: FruitType[] = [
        FruitType.Apple,
        FruitType.Grapes,
        FruitType.Orange,
        FruitType.Watermelon,
        FruitType.Pineapple,
    ];

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

    /* Property type */
    private type: FruitType;

    get Type(): FruitType {
        return this.type;
    }

    set Type( type: FruitType ) {
        this.type = type;
    }

    constructor() {
        this.x = 1;
        this.y = 1;
        this.type = null;
    }

    public setPosition( x: number, y: number ) {
        this.x = x;
        this.y = y;
    }
}
