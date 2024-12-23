/**
 * Represents a poison bar in the game that visually displays the current percentage of poison level.
 * Inherits from the `DrawableObject` class, and it updates the poison level by changing the displayed image
 * based on the given percentage.
 *
 * @class Poisionbar
 * @extends DrawableObject
 */
class Poisionbar extends DrawableObject {
    /**
     * An array of image paths that represent the poison bar at different percentage levels.
     * Each image corresponds to a different poison level, ranging from 0% to 100%.
     * @type {string[]}
     */
    IMAGES_POISON = [
        'img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png', // 0%
        'img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png', // 20%
        'img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png', // 40%
        'img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png', // 60%
        'img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png', // 80%
        'img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png' // 100%
    ];

    /**
     * Creates a new Poisionbar object, initializes the images for the poison bar, and sets its initial position and size.
     * The poison bar starts at 0% and displays the corresponding image.
     * 
     * @constructor
     */
    constructor() {
        super(); // Calls the constructor of the DrawableObject class
        this.loadImages(this.IMAGES_POISON); // Loads all images for the poison bar
        this.x = 20; // Sets the x position of the poison bar
        this.y = 80; // Sets the y position of the poison bar
        this.height = 50; // Sets the height of the poison bar
        this.width = 200; // Sets the width of the poison bar
        this.setPercentage(0); // Initializes the poison bar with 0% (no poison)
    }

    /**
     * Sets the poison bottle's percentage and updates the displayed image accordingly.
     * 
     * @param {number} bottlePercentage - The percentage value representing the current poison level.
     *                                     Should be a number between 0 and 100.
     * @returns {void}
     */
    setPercentage(bottlePercentage) {
        this.bottlePercentage = bottlePercentage; // Sets the current poison level
        let path = this.IMAGES_POISON[this.resolveImageIndex()]; // Resolves the correct image path based on the percentage
        this.img = this.imageCache[path]; // Sets the image of the poison bar
    }

    /**
     * Resolves the image index based on the current poison bottle percentage.
     * 
     * @returns {number} The index of the image in the `IMAGES_POISON` array.
     */
    resolveImageIndex() {
        if (this.bottlePercentage == 0) {
            return 0; // 0% poison
        } else if (this.bottlePercentage <= 20) {
            return 1; // 20% poison
        } else if (this.bottlePercentage <= 40) {
            return 2; // 40% poison
        } else if (this.bottlePercentage <= 60) {
            return 3; // 60% poison
        } else if (this.bottlePercentage <= 80) {
            return 4; // 80% poison
        } else {
            return 5; // 100% poison
        }
    }
}