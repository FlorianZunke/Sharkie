class ThrowableObject extends MovableObject {

    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.throw(x, y);
    }

    throw (x, y) {
        this.x = x;
        this.y = y;
        this.speedX = 15;

        setInterval(() => {
            if (world.character.otherDirection && world.keyboard.ATTACK_BUBBLE) {
                this.x -= this.speedX;
            } else {
                this.x += this.speedX;
            }
        }, 50);
    }
}