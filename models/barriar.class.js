/**
 * Represents a barrier in the game world that can interact with movable objects.
 * Inherits properties and methods from the `MovableObject` class.
 */
class Barriar extends MovableObject {
    /**
     * Creates a new Barriar instance.
     * @param {string} path - The path to the image representing the barrier.
     * @param {number} x - The x-coordinate of the barrier.
     * @param {number} y - The y-coordinate of the barrier.
     * @param {number} height - The height of the barrier.
     * @param {number} width - The width of the barrier.
     */
    // Adjustments for collision detection.
    hitboxTop = 15;
    hitboxLeft = 0;
    hitboxRight = 20;

    constructor(path, x, y, height, width, hitboxBottom) {
        super().loadImage(path);
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.hitboxBottom = hitboxBottom
    }
}