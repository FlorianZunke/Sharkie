/**
 * Represents a coin in the game that can be collected by the player.
 * The coin is a movable object that is displayed at a specified position in the game world.
 * 
 * @class Coin
 * @extends MovableObject
 */
class Coin extends MovableObject {
    
    /**
     * The height of the coin.
     * @type {number}
     */
    height = 75;

    /**
     * The width of the coin.
     * @type {number}
     */
    width = 75;

    /**
     * Initializes the coin with a specified image, position, and offset.
     * 
     * @param {string} path - The path to the coin's image file.
     * @param {number} x - The x-coordinate of the coin's position in the game world.
     * @param {number} y - The y-coordinate of the coin's position in the game world.
     */
    constructor(path, x, y) {
        super().loadImage(path); // Load the coin's image using the provided path
        this.x = x;               // Set the x-coordinate for the coin's position
        this.y = y;               // Set the y-coordinate for the coin's position
        this.offsetX = 10;        // Set the offset on the x-axis (if needed for adjustments)
        this.offsetY = 6;         // Set the offset on the y-axis (if needed for adjustments)
    }
}