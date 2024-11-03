class Level {
    enemies;
    backgroundObjects;
    coins;
    poision_bottles;
    barriar;
    level_end_x = 720*9;
    level_end_y = 0;

    constructor(enemies, backgroundObjects, coins, poision_bottles, barriar){
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.poision_bottles = poision_bottles;
        this.barriar = barriar;
    }
}