class Level {
    enemies;
    backgroundObjects;
    coins;
    barriar;
    level_end_x = 720*5;

    constructor(enemies, backgroundObjects, coins, barriar){
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.barriar = barriar;
    }
}