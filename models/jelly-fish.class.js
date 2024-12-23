/**
 * Represents a jellyfish enemy in the game. The jellyfish can swim up and down vertically,
 * animate its swimming movement, and change its appearance based on its state (normal, super dangerous, or dead).
 * 
 * @class JellyFish
 * @extends MovableObject
 */
class JellyFish extends MovableObject {
    /**
     * An array of image paths representing the jellyfish's normal swimming animation.
     * These images depict the jellyfish in a yellow color.
     * @type {string[]}
     */
    IMAGES_SWIM = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png',
    ];

    /**
     * An array of image paths representing the jellyfish's super dangerous swimming animation.
     * These images depict the jellyfish in a green color.
     * @type {string[]}
     */
    IMAGES_SUPERJELLY = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png',
    ];

    /**
     * An array of image paths representing the jellyfish's death animation.
     * These images depict the jellyfish in a yellow color when it dies.
     * @type {string[]}
     */
    IMAGES_JELLYDEAD = [
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png',
    ];

    /**
     * The height of the jellyfish object.
     * @type {number}
     */
    height = 100;

    /**
     * The width of the jellyfish object.
     * @type {number}
     */
    width = 125;

    /**
     * Creates a new JellyFish object with the specified position and vertical movement limits.
     * The jellyfish has a random speed within a certain range and starts with a swimming animation.
     * 
     * @constructor
     * @param {number} x - The x-coordinate (horizontal position) of the jellyfish.
     * @param {number} y - The y-coordinate (vertical position) of the jellyfish.
     * @param {number} minY - The minimum vertical limit for the jellyfish's movement.
     * @param {number} maxY - The maximum vertical limit for the jellyfish's movement.
     */
    constructor(x, y, minY, maxY) {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png'); // Initial image for jellyfish
        this.loadImages(this.IMAGES_SWIM); // Load images for normal swimming
        this.loadImages(this.IMAGES_SUPERJELLY); // Load images for super dangerous swimming
        this.loadImages(this.IMAGES_JELLYDEAD); // Load images for death animation
        this.x = x; // Set the x-coordinate for jellyfish
        this.y = y; // Set the y-coordinate for jellyfish
        this.minY = minY; // Set the minimum vertical movement limit
        this.maxY = maxY; // Set the maximum vertical movement limit
        this.speed = 1.2 + Math.random() * 0.3; // Random speed between 1.2 and 1.5
        this.animate(); // Start animation
    }

    /**
     * Animates the jellyfish by moving it vertically within the specified limits and playing
     * the appropriate animation based on its state (swimming or dead).
     * This method continuously updates the jellyfish's position and animation.
     * 
     * @returns {void}
     */
    animate() {
        setInterval(() => {
            this.moveVertical(); // Move the jellyfish vertically within minY and maxY limits
        }, 1000 / 60); // Move at 60 frames per second
    
        setInterval(() => {
            if (this.jellyFishDead) {
                this.playAnimation(this.IMAGES_JELLYDEAD); // Play death animation if jellyfish is dead
            } else {
                this.playAnimation(this.IMAGES_SWIM); // Play swimming animation if jellyfish is alive
            }
        }, 300); // Change animation every 300 milliseconds
    }
}