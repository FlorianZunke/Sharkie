/**
 * Represents the final boss in the game.
 * Inherits from the `MovableObject` class.
 */
class Endboss extends MovableObject {
    /**
     * The height of the endboss.
     * @type {number}
     * @default 350
     */
    height = 350;

    /**
     * The width of the endboss.
     * @type {number}
     * @default 300
     */
    width = 300;

    /**
     * Indicates whether the endboss has reached a certain x-coordinate.
     * @type {boolean}
     * @default false
     */
    reachedXCoords = false;

    /**
     * Tracks whether the endboss has had its first contact with the player.
     * @type {boolean}
     * @default false
     */
    hadFirstContact = false;

    /**
     * Indicates whether the endboss is hurt.
     * @type {boolean}
     * @default false
     */
    getHurt = false;

    // Image arrays for various endboss states.
    IMAGES_SPAWN = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png',
    ];

    IMAGES_SWIM = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png',
    ];

    IMAGES_DAMAGED = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png',
    ];

    IMAGES_DEAD = [
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
    ];

    IMAGES_ATTACK = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png',
    ];

    /**
     * Creates a new Endboss instance.
     * @param {number} y - The y-coordinate of the endboss.
     * @param {number} minY - The minimum y-coordinate for movement.
     * @param {number} maxY - The maximum y-coordinate for movement.
     */
    constructor(y, minY, maxY) {
        super().loadImage(this.IMAGES_SWIM[0]);
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_SPAWN);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_DAMAGED);
        this.loadImages(this.IMAGES_ATTACK);
        this.animate();
        this.endbossAttack();
        this.moveBossVertical();

        this.x = 6400;
        this.y = y;
        this.minY = minY;
        this.maxY = maxY;
        this.speed = 2.2 + Math.random() * 0.5;
        this.hitboxTop = 110;
        this.hitboxLeft = 0;
        this.hitboxRight = 0;
        this.hitboxBottom = 10;
    }

    /**
     * Handles the animation logic for the endboss.
     * The animation sequence changes based on the boss's state (e.g., spawn, hurt, dead, etc.).
     */
    animate() {
        let i = 0;

        setInterval(() => {
            if (this.endbossDead) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.getHurt) {
                this.playAnimation(this.IMAGES_DAMAGED);
                setTimeout(() => {
                    this.getHurt = false;
                }, 500);
            } else {
                if (i < 10) {
                    this.playAnimation(this.IMAGES_SPAWN);
                } else {
                    this.playAnimation(this.IMAGES_SWIM);
                }
            }
            i++;

            if (this.reachedXCoords && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
                pauseSound('background_music');
                playSound('endboss_fight');
                sounds.endboss_fight.loop = true;
            }
        }, 100);
    }

    /**
     * Handles the endboss's attack logic.
     * The endboss will attack when the player crosses a certain x-coordinate.
     */
    endbossAttack() {
        setInterval(() => {
            if (world.character.x > 5650 && this.hadFirstContact) {
                this.x -= 200;
                this.playAnimation(this.IMAGES_ATTACK);
                setTimeout(() => {
                    this.x += 200;
                }, 1000);
            }
        }, 3000);
    }

    /**
    * Moves the Endboss vertically, alternating direction when reaching boundaries.
    */
    moveBossVertical() {
        let movingDown = true;

        setInterval(() => {
            if (movingDown) {
                this.y += this.speed;
                if (this.y >= this.maxY) {
                    movingDown = false;
                }
            } else {
                this.y -= this.speed;
                if (this.y <= this.minY) {
                    movingDown = true;
                }
            }
        }, 100);
    }
}