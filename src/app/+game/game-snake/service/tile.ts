/**
 * tile
 */

import { uuid } from '../../shared/utils';
export enum TileContent {
    Empty,
    Wall,
}

export class Tile {
    /* Property id */
    private id: string;

    get Id(): string {
        return this.id;
    }

    /* Property content */
    private content: TileContent;

    get Content(): TileContent {
        return this.content;
    }

    set Content( content: TileContent ) {
        this.content = content;
    }

    constructor( content: TileContent ) {
        this.id = uuid();
        this.content = content;
    }
}
