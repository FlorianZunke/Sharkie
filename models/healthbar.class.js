/**
 * Represents a health bar in the game, displaying the player's health as a percentage.
 * The health bar updates and changes appearance based on the player's current health.
 * 
 * @class HealthBar
 * @extends DrawableObject
 */
class HealthBar extends DrawableObject {

    /**
     * The current health percentage of the player (between 0 and 100).
     * @type {number}
     */
    percentage = 100;

    /**
     * Array of image paths representing different health levels (0%, 20%, 40%, 60%, 80%, 100%).
     * @type {string[]}
     */
    IMAGES_HEALTH = [
        'img/4. Marcadores/green/Life/0_  copia 3.png',
        'img/4. Marcadores/green/Life/20_ copia 4.png',
        'img/4. Marcadores/green/Life/40_  copia 3.png',
        'img/4. Marcadores/green/Life/60_  copia 3.png',
        'img/4. Marcadores/green/Life/80_  copia 3.png',
        'img/4. Marcadores/green/Life/100_  copia 2.png'
    ];

    /**
     * Creates a new health bar that represents the player's health.
     * Initializes the health bar to a default percentage of 100 and loads the corresponding image.
     * 
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH); // Load all health images
        this.x = 20; // Set x position of the health bar
        this.y = 0;  // Set y position of the health bar
        this.height = 50; // Set the height of the health bar
        this.width = 200; // Set the width of the health bar
        this.setPercentage(100); // Set initial health percentage to 100
    }

    /**
     * Updates the health bar to display the current health percentage.
     * Changes the image based on the percentage value.
     * 
     * @param {number} percentage - The current health percentage (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage; // Update the health percentage
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()]; // Get the corresponding image
        this.img = this.imageCache[path]; // Set the health bar image
    }

    /**
     * Resolves the correct image index based on the current health percentage.
     * This determines which image to display from the `IMAGES_HEALTH` array.
     * 
     * @returns {number} The index of the image corresponding to the current health percentage.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5; // 100% health
        } else if (this.percentage >= 80) {
            return 4; // 80% health
        } else if (this.percentage >= 60) {
            return 3; // 60% health
        } else if (this.percentage >= 40) {
            return 2; // 40% health
        } else if (this.percentage >= 20) {
            return 1; // 20% health
        } else {
            return 0; // 0% health
        }
    }
}