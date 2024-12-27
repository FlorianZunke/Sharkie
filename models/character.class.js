/**
     * Class representing the main character of the game.
     * Extends the MovableObject class and handles animations, movement, and interactions with the environment.
     */
class Character extends MovableObject {
    /**
     * Reference to the game world object.
     * @type {Object}
     */
    world;

    /**
     * The vertical position of the character.
     * @type {number}
     */
    y = 100;

    /**
     * The movement speed of the character.
     * @type {number}
     */
    speed = 11;

    /**
     * Flags indicating if the character is hurt by poison or electricity.
     * @type {boolean}
     */
    poisionHurt = false;
    electricHurt = false;

    /**
     * Counter to track idle time for triggering idle animations.
     * @type {number}
     */
    idleCounter = 0;

    /**
     * Image arrays for various character animations.
     * @type {string[]}
     */
    IMAGES_IDLE = [ // Idle animation images
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
    ];
    IMAGES_SLEEP = [ // Sleep animation images
        'img/1.Sharkie/2.Long_IDLE/i1.png',
        'img/1.Sharkie/2.Long_IDLE/I2.png',
        'img/1.Sharkie/2.Long_IDLE/I3.png',
        'img/1.Sharkie/2.Long_IDLE/I4.png',
        'img/1.Sharkie/2.Long_IDLE/I5.png',
        'img/1.Sharkie/2.Long_IDLE/I6.png',
        'img/1.Sharkie/2.Long_IDLE/I7.png',
        'img/1.Sharkie/2.Long_IDLE/I8.png',
        'img/1.Sharkie/2.Long_IDLE/I9.png',
        'img/1.Sharkie/2.Long_IDLE/I10.png',
        'img/1.Sharkie/2.Long_IDLE/I11.png',
        'img/1.Sharkie/2.Long_IDLE/I12.png',
        'img/1.Sharkie/2.Long_IDLE/I13.png',
        'img/1.Sharkie/2.Long_IDLE/I14.png',
    ];
    IMAGES_SWIM = [ // Swim animation images
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];
    IMAGES_DEAD = [ // Dead animation images
        'img/1.Sharkie/6.dead/2.Electro_shock/1.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/2.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/4.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/5.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/7.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/8.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/9.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/10.png'
    ];
    IMAGES_ELECTRIC_HURT = [ // Electric hurt animation images 
        'img/1.Sharkie/5.Hurt/2.ElectricShock/1.png',
        'img/1.Sharkie/5.Hurt/2.ElectricShock/3.png',
        'img/1.Sharkie/5.Hurt/2.ElectricShock/1.png',
        'img/1.Sharkie/5.Hurt/2.ElectricShock/3.png',
        'img/1.Sharkie/5.Hurt/2.ElectricShock/1.png',
        'img/1.Sharkie/5.Hurt/2.ElectricShock/3.png'
    ];
    IMAGES_POISON_HURT = [ // Poison hurt animation images
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/5.png'
    ];
    IMAGES_ATTACK_SLAP = [ // Attack slap animation images
        'img/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/1.Sharkie/4.Attack/Fin slap/4.png',
        'img/1.Sharkie/4.Attack/Fin slap/5.png',
        'img/1.Sharkie/4.Attack/Fin slap/6.png',
        'img/1.Sharkie/4.Attack/Fin slap/7.png',
        'img/1.Sharkie/4.Attack/Fin slap/8.png',
    ];
    IMAGES_ATTACK_BUBBLE = [ // Attack bubble animation images
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png',
    ];
    /**
     * Initializes the character, loads images, and starts animations.
     */
    constructor() {
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_POISON_HURT);
        this.loadImages(this.IMAGES_ELECTRIC_HURT);
        this.loadImages(this.IMAGES_ATTACK_SLAP);
        this.loadImages(this.IMAGES_ATTACK_BUBBLE);

        // Adjustments for collision detection.
        this.hitboxTop = 190;
        this.hitboxLeft = 35;
        this.hitboxRight = 80;
        this.hitboxBottom = 75;

        this.animate();
    }

    /**
     * Handles animations based on character states such as swimming, idle, hurt, or dead.
     * Also manages user inputs for movement and attacks.
     */
    animate() {
        let idleAnimationStarted = false;

        // Animation and state updates every 150ms.
        setInterval(() => {
            if (this.isDead()) {
                this.gameOver = true;
                idleAnimationStarted = false;
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt() && this.poisionHurt) {
                this.idleCounter = 0;
                this.playAnimation(this.IMAGES_POISON_HURT);
            } else if (this.isHurt() && this.electricHurt) {
                this.idleCounter = 0;
                this.playAnimation(this.IMAGES_ELECTRIC_HURT);
            } else if (this.isSwimming()) {
                this.idleCounter = 0;
                idleAnimationStarted = false;
                this.playAnimation(this.IMAGES_SWIM);
            } else if (this.idleCounter > 35) {
                if (!idleAnimationStarted) {
                    this.currentImage = 0;
                }
                idleAnimationStarted = true;
                if (this.currentImage <= 14) {
                    this.playAnimation(this.IMAGES_SLEEP);
                    playSound('snoring_sound');
                } else {
                    this.playAnimation(this.IMAGES_SLEEP.slice(11));
                    playSound('snoring_sound');
                }
            } else {
                this.idleCounter++;
                this.playAnimation(this.IMAGES_IDLE);
                pauseSound('snoring_sound');
            }
        }, 150);

        // Attack animations for slap and bubble.
        setInterval(() => {
            pauseSound('bubbleshot_sound', 'slap_sound');
            if (this.world.keyboard.ATTACK_SLAP) {
                this.idleCounter = 0;
                this.playAnimation(this.IMAGES_ATTACK_SLAP);
                pauseSound('snoring_sound');
                playSound('slap_sound');
            }

            if (this.world.keyboard.ATTACK_BUBBLE) {
                this.idleCounter = 0;
                this.playAnimation(this.IMAGES_ATTACK_BUBBLE);
                pauseSound('snoring_sound');
                playSound('bubbleshot_sound');
            }
        }, 90);

        // Movement handling.
        setInterval(() => {
            pauseSound('swim_sound');

            // Update collision state before processing movement
            this.isCollidingWithBarrier();

            // Check for movements and block them if collisions occur
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.collisionright) {
                this.x += this.speed;
                this.otherDirection = false;
                playSound('swim_sound');
            }

            if (this.world.keyboard.LEFT && this.x > 0 && !this.collisionleft) {
                this.x -= this.speed;
                this.otherDirection = true;
                playSound('swim_sound');
            }

            if (this.world.keyboard.UP && this.y > -150 && !this.collisiontop) {
                this.y -= this.speed;
                playSound('swim_sound');
            }

            if (this.world.keyboard.DOWN && this.y < 215 && !this.collisionbottom) {
                this.y += this.speed;
                playSound('swim_sound');
            }

            // Update camera position.
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * Determines if the character is swimming based on keyboard input.
     * @returns {boolean} True if the character is swimming, false otherwise.
     */
    isSwimming() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN;
    }
}