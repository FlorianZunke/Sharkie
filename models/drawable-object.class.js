class DrawableObject {
    x = 100;
    y = 150;
    height = 325;
    width = 300;
    offsetRight = 0;
    offsetLeft = 0;
    offsetUp = 0;
    offsetDown = 0;
    img;
    currentImage = 0;
    imageCache = {};

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Barriar || this instanceof Coin || this instanceof JellyFish || this instanceof Endboss || this instanceof JellyFish ) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }

        if (this instanceof Character || this instanceof JellyFish || this instanceof Endboss || this instanceof Barriar || this instanceof Coin || this instanceof JellyFish || this instanceof PoisionBottle) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offsetX, this.y + 2 * (this.offsetY), this.width - 2 * (this.offsetX), this.height - 3 * (this.offsetY));
            ctx.stroke();
        }
    }
} 