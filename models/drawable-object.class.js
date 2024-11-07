class DrawableObject {
    x = 100;
    y = 150;
    height = 325;
    width = 300;
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
        if (this instanceof Character || this instanceof PufferFish || this instanceof JellyFish || this instanceof Endboss || this instanceof Coin || this instanceof PoisionBottle) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    // drawFrame(ctx) {
    //     if (this instanceof Character || this instanceof PufferFish || this instanceof JellyFish || this instanceof Endboss || this instanceof Coin || this instanceof PoisionBottle) {
    //         ctx.beginPath();
    //         ctx.lineWidth = '3';
    //         ctx.strokeStyle = 'red';
    //         ctx.rect(this.x - offsetX, this.y  - offsetY, this.width, this.height);
    //         ctx.stroke();
    //     }
    // }
}