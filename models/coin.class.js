class Coin extends MovableObject {
    height = 75;
    width = 75;
    path
    x
    y

    constructor(path, x, y) {
        super().loadImage(path);
        this.x = x;
        this.y = y;
        this.offsetX = 10;
        this.offsetY = 6;
    }
}