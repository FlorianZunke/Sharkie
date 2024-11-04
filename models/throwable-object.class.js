class ThrowableObject extends MovableObject {
    height = 50;
    width = 50;



    constructor() {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = 100;
        this.y = 100;
        this.throw(150, 150);
    }

    throw (x, y) {
        this.x = x;
        this.y = y;
        this.speedX = 30;
        this.shotBubbles();
    }
}