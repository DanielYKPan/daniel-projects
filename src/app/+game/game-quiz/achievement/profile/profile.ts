/**
 * profile
 */
import { ThemeProfile } from '../events/themeProfile';

export class Profile {
    public points: number;
    public themeProfiles: ThemeProfile[];
    public consecutively: number;
    public wrong: number;
    public correct: number;
    public completedGames: number;

    constructor() {
        this.points = 0;
        this.themeProfiles = [];
    }
}
