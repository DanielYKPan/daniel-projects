/**
 * tile
 */
import { uuid } from '../../shared';

export interface Coordination {
    x: number;
    y: number;
}

export class Tile {

    public coordination: Coordination;
    public value: number;
    public originalCoordi: Coordination;
    public merged: boolean;
    public shouldDump: boolean;

    /* Property id */
    private id: string;

    get Id(): string {
        return this.id;
    }

    constructor( coordination?: Coordination, value?: number ) {
        this.id = uuid();
        this.coordination = coordination || null;
        this.value = value || 2;
        this.merged = false;
        this.shouldDump = false;
    }

    // Backup the position so that we could do a undo
    public backupPosition() {
        this.originalCoordi = this.coordination;
    }

    public resetMergedStatus() {
        this.merged = false;
    }
}
