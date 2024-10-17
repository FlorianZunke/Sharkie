class Level {
    enemies;
    backgroundObjects;
    level_end_x = 720*5;

    constructor(enemies,backgroundObjects){
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
    }
}