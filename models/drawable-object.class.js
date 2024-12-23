/**
 * Represents a drawable object in the game, with the ability to load images, draw the object on the canvas,
 * and display frames for debugging or visualizing boundaries.
 * 
 * @class DrawableObject
 */
class DrawableObject {
    
    /**
     * The x-coordinate of the object on the canvas.
     * @type {number}
     */
    x = 100;
    
    /**
     * The y-coordinate of the object on the canvas.
     * @type {number}
     */
    y = 150;

    /**
     * The height of the object.
     * @type {number}
     */
    height = 325;

    /**
     * The width of the object.
     * @type {number}
     */
    width = 300;

    /**
     * The offset in the x-direction for drawing the object.
     * @type {number}
     */
    offsetX = 0;

    /**
     * The offset in the y-direction for drawing the object.
     * @type {number}
     */
    offsetY = 0;

    /**
     * The image of the object.
     * @type {HTMLImageElement}
     */
    img;

    /**
     * The index of the current image in the image array (for animation).
     * @type {number}
     */
    currentImage = 0;

    /**
     * A cache for storing images loaded for the object.
     * @type {Object}
     */
    imageCache = {};

    /**
     * Loads a single image into the object.
     * 
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images into the object and stores them in the image cache.
     * 
     * @param {string[]} arr - An array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the object on the canvas at its current position with the specified width and height.
     * 
     * @param {CanvasRenderingContext2D} ctx - The 2D context of the canvas to draw on.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws frames around the object for debugging or visualizing boundaries.
     * The frame color and size vary depending on the type of the object.
     * 
     * @param {CanvasRenderingContext2D} ctx - The 2D context of the canvas to draw on.
     */

    // drawFrame(ctx) {
        // Draw blue frame for specific object types
        // if (this instanceof Character || this instanceof Barriar || this instanceof Coin || this instanceof JellyFish || this instanceof Endboss || this instanceof JellyFish) {
        //     ctx.beginPath();
        //     ctx.lineWidth = '3';
        //     ctx.strokeStyle = 'blue';
        //     ctx.rect(this.x, this.y, this.width, this.height);
        //     ctx.stroke();
        // }

        // Draw red frame for other object types (e.g., Character, JellyFish, Endboss, etc.)
        // if (this instanceof Character || this instanceof JellyFish || this instanceof Endboss || this instanceof Barriar || this instanceof Coin || this instanceof JellyFish || this instanceof PoisionBottle) {
        //     ctx.beginPath();
        //     ctx.lineWidth = '3';
        //     ctx.strokeStyle = 'red';
        //     ctx.rect(this.x + this.offsetX, this.y + 2 * (this.offsetY), this.width - 2 * (this.offsetX), this.height - 3 * (this.offsetY));
        //     ctx.stroke();
        // }
    // }
}