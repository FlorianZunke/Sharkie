class MovableObject {
    x = 120;
    y = 150;
    img;
    height = 325;
    width = 300;
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    imageCache = [];

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

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}