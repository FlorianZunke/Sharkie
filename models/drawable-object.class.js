class DrawableObject {
    x = 100;
    y = 150;
    height = 325;
    width = 300;
    hitboxTop = 0;
    hitboxLeft = 0;
    hitboxRight = 0;
    hitboxBottom = 0;
    img;
    currentImage = 0;
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
}                                                                       