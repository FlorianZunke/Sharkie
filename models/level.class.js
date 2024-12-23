/**
 * Represents a level in the game. A level consists of enemies, background objects, coins, 
 * poison bottles, and barriers. The level also defines the boundaries for the end of the level.
 * 
 * @class Level
 */
class Level {
    /**
     * An array of enemy objects present in the level.
     * @type {MovableObject[]}
     */
    enemies;

    /**
     * An array of background objects (e.g., backgrounds, platforms) for the level.
     * @type {BackgroundObject[]}
     */
    backgroundObjects;

    /**
     * An array of coin objects scattered across the level.
     * @type {Coin[]}
     */
    coins;

    /**
     * An array of poison bottle objects scattered across the level.
     * @type {PoisionBottle[]}
     */
    poision_bottles;

    /**
     * An array of barrier objects present in the level.
     * @type {Barriar[]}
     */
    barriar;

    /**
     * The x-coordinate that marks the end of the level.
     * @type {number}
     */
    level_end_x = 720 * 9;

    /**
     * The y-coordinate that marks the end of the level.
     * @type {number}
     */
    level_end_y = 0;

    /**
     * Creates a new level with the specified enemies, background objects, coins, poison bottles, and barriers.
     * 
     * @constructor
     * @param {MovableObject[]} enemies - An array of enemies that are part of the level.
     * @param {BackgroundObject[]} backgroundObjects - An array of background objects for the level.
     * @param {Coin[]} coins - An array of coins for the level.
     * @param {PoisionBottle[]} poision_bottles - An array of poison bottles for the level.
     * @param {Barriar[]} barriar - An array of barriers for the level.
     */
    constructor(enemies, backgroundObjects, coins, poision_bottles, barriar){
        this.enemies = enemies; // Set the enemies in the level
        this.backgroundObjects = backgroundObjects; // Set the background objects in the level
        this.coins = coins; // Set the coins in the level
        this.poision_bottles = poision_bottles; // Set the poison bottles in the level
        this.barriar = barriar; // Set the barriers in the level
    }
}