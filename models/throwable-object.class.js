class ThrowableObject extends MovableObject {
    direction;
    
    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.offsetX = 0;
        this.offsetY = 0;
        this.throw(x, y);
    }

    throw (x, y) {
        this.direction = world.character.otherDirection;
        this.x = x;
        this.y = y;
        this.speedX = 30;

        setInterval(() => {
            if (this.direction) {
                this.x -= this.speedX;
            } else {
                this.x += this.speedX;
            }
        }, 100);
    };
};