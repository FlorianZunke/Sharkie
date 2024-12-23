/**
 * Class representing a PufferFish enemy in the game.
 * Extends the MovableObject class and handles animation, movement, and state transitions.
 */
class PufferFish extends MovableObject {
    /**
     * Array of images for the swimming animation.
     * @type {string[]}
     */
    IMAGES_SWIM = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png',
    ];

    /**
     * Array of images for the transition animation.
     * @type {string[]}
     */
    IMAGES_TRANSITION = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition5.png',
    ];

    /**
     * Height of the PufferFish object.
     * @type {number}
     */
    height = 100;

    /**
     * Width of the PufferFish object.
     * @type {number}
     */
    width = 125;

    /**
     * Creates a new PufferFish instance.
     * @param {number} x - The initial x-coordinate of the PufferFish.
     * @param {number} y - The initial y-coordinate of the PufferFish.
     * @param {number} minX - The minimum x-coordinate for horizontal movement.
     * @param {number} maxX - The maximum x-coordinate for horizontal movement.
     */
    constructor(x, y, minX, maxX) {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png');
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_TRANSITION);
        this.x = x;
        this.y = y;
        this.minX = minX;
        this.maxX = maxX;
        this.offsetX = 0;
        this.offsetY = 0;
        this.speed = 2.5 + Math.random() * 0.7; // Adds a slight random variation to the speed.
        this.animate();
    }

    /**
     * Starts the animation and movement of the PufferFish.
     * Handles horizontal movement, swimming animation, and transition animation.
     */
    animate() {
        // Handles horizontal movement.
        setInterval(() => {
            this.moveHorizontal();
        }, 1000 / 60);

        // Plays the swimming animation.
        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIM);
        }, 200);

        // Plays the transition animation periodically.
        setInterval(() => {
            this.playAnimation(this.IMAGES_TRANSITION);
        }, 400);
    }
}
