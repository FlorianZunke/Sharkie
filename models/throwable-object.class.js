class ThrowableObject extends MovableObject {
    direction;
    constructor(x, y) {
        super();
        this.animate();
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.offsetX = 0;
        this.offsetY = 0;
        this.throw(x, y);
    }

    /**
     * Sets the appropriate image for the throwable object based on the character's state.
     * If the character's bubble is poisoned, a poisoned bubble image is loaded.
     * Otherwise, a normal bubble image is loaded.
     */
    animate() {
        if (world.character.poisionBubble) {
            this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        } else {
            this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        }
    }

    /**
     * Initiates the throw action for the throwable object.
     * The object moves either left or right depending on the character's direction.
     * @param {number} x - The initial x-coordinate of the throwable object.
     * @param {number} y - The initial y-coordinate of the throwable object.
     */
    throw(x, y) {
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
    }
}
