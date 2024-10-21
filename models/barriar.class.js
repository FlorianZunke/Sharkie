class Barriar extends MovableObject {
    
    constructor(path, x, y, height, width) {
        super().loadImage(path);
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
}