class Barriar extends MovableObject {
    path
    x
    y
    height
    width
    hitboxTop = 15;
    hitboxLeft = 20;
    hitboxRight = 20;

    constructor(path, x, y, height, width, hitboxTop, hitboxBottom) {
        super().loadImage(path);
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.hitboxTop = hitboxTop
        this.hitboxBottom = hitboxBottom
    }
}