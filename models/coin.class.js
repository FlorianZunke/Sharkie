class Coin extends MovableObject {

    height = 75;
    width = 75;
    
    constructor(path, x, y) {
        super().loadImage(path);
        this.x = x;
        this.y = y;
    }
}