/**
 * Represents a poison bottle object that can be interacted with in the game.
 * Inherits from the `MovableObject` class and is responsible for displaying the poison bottle in the game world,
 * as well as animating its appearance by alternating between two images.
 *
 * @class PoisionBottle
 * @extends MovableObject
 */
class PoisionBottle extends MovableObject {
    /**
     * The height of the poison bottle.
     * @type {number}
     * @default 85
     */
    height = 85;

    /**
     * The width of the poison bottle.
     * @type {number}
     * @default 85
     */
    width = 85;

    /**
     * An array containing the paths to the two images used for animating the poison bottle.
     * The images are used to alternate between the left and right facing orientations.
     * @type {string[]}
     */
    IMAGES_POISIONBOTTLE = [
        'img/4. Marcadores/Posión/Dark - Left.png',
        'img/4. Marcadores/Posión/Dark - Right.png'
    ];

    /**
     * Creates a new PoisonBottle object, loading the image and setting its position.
     * The object also starts the animation to alternate between two images every 200ms.
     * 
     * @constructor
     * @param {string} path - The path to the initial image of the poison bottle.
     * @param {number} x - The x-coordinate of the poison bottle.
     * @param {number} y - The y-coordinate of the poison bottle.
     */
    constructor(path, x, y) {
        super().loadImage(path);  // Loads the initial image from the provided path
        this.loadImages(this.IMAGES_POISIONBOTTLE);  // Loads both the left and right poison bottle images
        this.animate();  // Starts the animation for alternating images
        this.x = x;  // Sets the x position of the bottle
        this.y = y;  // Sets the y position of the bottle
        this.offsetX = 10;  // Horizontal offset for the collision box
        this.offsetY = 6;   // Vertical offset for the collision box
    }

    /**
     * Starts the animation of the poison bottle by alternating between the left and right images every 200ms.
     * This function is called automatically when a new instance of `PoisionBottle` is created.
     * 
     * @private
     * @returns {void}
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_POISIONBOTTLE);  // Plays the animation by cycling through the images
        }, 200);  // Changes image every 200 milliseconds
    }
}