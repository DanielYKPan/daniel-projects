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

    /* Property value */
    private value: number;

    get Value(): number {
        return this.value;
    }

    /* Property coordination */
    private coordination: ICoordination;

    get Coordination(): ICoordination {
        return this.coordination;
    }

    set Coordination( coordination ) {
        this.coordination = coordination;
    }

    /* Property isBlank */
    private isBlank: boolean;

    get Blank(): boolean {
        return this.isBlank;
    }

    constructor( value?: number, coordination?: ICoordination, isBlank?: boolean ) {
        this.id = uuid();
        this.value = value === null ? null : value;
        this.coordination = coordination || null;
        this.isBlank = isBlank === true;
    }
}

export interface ICoordination {
    x: number;
    y: number;
}
