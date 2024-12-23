/**
 * Represents a background object in the game world.
 * Inherits properties and methods from the `MovableObject` class.
 */
class BackgroundObject extends MovableObject {
    /**
     * The width of the background object.
     * @type {number}
     * @default 720
     */
    width = 720;

    /**
     * The height of the background object.
     * @type {number}
     * @default 480
     */
    height = 480;

    /**
     * Creates a new BackgroundObject instance.
     * @param {string} imagePath - The path to the image representing the background object.
     * @param {number} x - The x-coordinate of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 0; // Background objects are always positioned at the top of the canvas.
    }
}