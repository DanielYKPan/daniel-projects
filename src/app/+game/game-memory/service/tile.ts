/**
 * tile
 */

import { uuid } from '../../shared';

export class Tile {
    /* Property id */
    private id: string;

    get Id(): string {
        return this.id;
    }

    private content: string;

    get Content(): string {
        return this.content;
    }

    /* Property revealed */
    private revealed: boolean;

    get Revealed(): boolean {
        return this.revealed;
    }

    set Revealed( value: boolean ) {
        this.revealed = value;
    }

    constructor( content?: string ) {
        this.id = uuid();
        this.content = content || null;
        this.revealed = true;
    }
}
