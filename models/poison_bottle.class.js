class PoisionBottle extends MovableObject {
    height = 85;
    width = 85;

    constructor(path, x, y) {
        super().loadImage(path);
        this.x = x;
        this.y = y;
    }
} 
