/**
 * The `World` class represents the game world, handling the main logic for character movement, interactions,
 * collision detection, and rendering. It also manages game states such as health, coins, and poison bottles.
 * 
 * @class World
 */
class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar();
    poisionBar = new Poisionbar();
    coinBar = new CoinBar();
    throwableObjects = [];
    reachedXCoords = false;
    invincible = false;
    time = Date.now();

    /**
     * Creates an instance of the `World` class.
     * 
     * @param {HTMLCanvasElement} canvas - The canvas element used for rendering the game world.
     * @param {Object} keyboard - The keyboard input handler for controlling the character.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        playSound('background_music');
        sounds.background_music.loop = true;
        this.draw();
        this.setWorld();
        this.checkAttackCollisions();
        this.checkXCoord();
        this.run();
    }

    /**
     * Sets the world for the character by linking the world instance to the character.
     * @method setWorld
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Runs the core game loop, checking for various game events like coin collection,
     * collision detection, and win/loss conditions.
     * @method run
     */
    run() {
        setInterval(() => {
            this.checkCoinCollions();
            this.checkPoisionBottleCollions();
            this.checkThrowObjects();
            this.checkBubbleCollision();
            this.checkGameOver();
            this.checkEndbossDead();
            this.checkWin();
            if (this.reachedXCoords) {
                this.endboss.reachedXCoords = true;
            }
        }, 400);
    }

    /**
     * Checks for collisions between the character and various enemies and handles the appropriate reactions.
     * @method checkCollisions
     */
    checkAttackCollisions() {
        setInterval(() => {
            this.poisionHurt = false;
            this.electricHurt = false;
            this.level.enemies.forEach((enemy, index) => {
                if (this.character.isColliding(enemy)) {
                    this.handleCollision(enemy, index);
                }
            });
        }, 400);
    }

    /**
     * Handles the logic for collisions, including attack-based and non-attack-based reactions.
     * @method handleCollision
     * @param {Object} enemy - The enemy object that the character collided with.
     * @param {number} index - The index of the enemy in the enemies array.
     */
    handleCollision(enemy, index) {
        this.invincible = false;

        if (this.keyboard.ATTACK_SLAP) {
            this.invincible = true;

            if (enemy instanceof PufferFish && this.invincible) {
                this.level.enemies.splice(index, 1);
            }
        } else {
            this.handleDamage(enemy);
        }
    }

    /**
     * Handles the damage logic for non-attack-based collisions.
     * @method handleDamage
     * @param {Object} enemy - The enemy object that caused damage to the character.
     */
    handleDamage(enemy) {
        if (enemy instanceof PufferFish || enemy instanceof Endboss) {
            this.character.hit();
            this.character.poisionHurt = true;
            this.character.electricHurt = false;
            this.healthBar.setPercentage(this.character.energy);
        }

        if (enemy instanceof JellyFish) {
            this.character.hit();
            this.character.poisionHurt = false;
            this.character.electricHurt = true;
            this.healthBar.setPercentage(this.character.energy);
        }
    }

    /**
     * Checks for collisions between thrown objects (bubbles) and enemies. 
     * Removes enemies upon collision with appropriate objects (e.g., JellyFish).
     * @method checkBubbleCollision
     */
    checkBubbleCollision() {
        this.throwableObjects.forEach((bubble) => {
            level1.enemies.forEach((enemy, enemyIndex) => {
                if (bubble.isColliding(enemy) && enemy instanceof JellyFish) {
                    this.level.enemies.splice(enemyIndex, 1);
                }
                if (bubble.isColliding(enemy) && enemy instanceof Endboss && this.character.poisionBubble) {
                    this.hitEndboss();
                }
            });
        });
    }

    /**
     * Checks for collisions between the character and coins. 
     * Updates the coin count and triggers a coin collection sound effect.
     * @method checkCoinCollions
     */
    checkCoinCollions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoins();
                this.level.coins.splice(index, 1);
                this.coinBar.setPercentage(this.character.coinPercentage);
                playSound('coin');
            }
        });
    }

    /**
     * Checks for collisions between the character and poison bottles. 
     * Updates the poison bottle count and triggers a bottle collection sound effect.
     * @method checkPoisionBottleCollions
     */
    checkPoisionBottleCollions() {
        this.level.poision_bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottles();
                this.level.poision_bottles.splice(index, 1);
                this.poisionBar.setPercentage(this.character.bottlePercentage);
                playSound('bottle');
            }
        });
    }

    /**
     * Handles the creation of throwable objects (bubbles) when the player attacks.
     * It checks the character's direction and places the bubble accordingly.
     * @method checkThrowObjects
     */
    checkThrowObjects() {
        if (this.character.otherDirection && this.keyboard.ATTACK_BUBBLE) {
            let bubble = new ThrowableObject(this.character.x, this.character.y + 160);
            this.throwableObjects.push(bubble);
            setTimeout(() => {
                this.throwableObjects.splice(0, 1);
            }, 1000)
        }
        if (!this.character.otherDirection && this.keyboard.ATTACK_BUBBLE) {
            let bubble = new ThrowableObject(this.character.x + 250, this.character.y + 160);
            this.throwableObjects.push(bubble);
            setTimeout(() => {
                this.throwableObjects.splice(0, 1);
            }, 1000)
        }
    }

    /**
     * Checks if the game is over based on the character's health and status.
     * Displays a loss overlay and pauses the background music upon game over.
     * @method checkGameOver
     */
    checkGameOver() {
        if (this.character.isDead() && this.character.gameOver == true) {
            let overlayLose = document.getElementById('lose_container');
            let canvas = document.getElementById('canvas');
            let mobileButtons = document.getElementById('mobile_buttons');
            let hud = document.getElementById('hud');

            mobileButtons.classList.add('d-none-i');
            canvas.classList.remove('d-block');
            overlayLose.classList.add('overlay-container');
            overlayLose.classList.remove('d-none');
            hud.classList.add('d-none-i');
            pauseSound('background_music');
            pauseSound('endboss_fight');
            playSound('lose');
            this.clearAllIntervals();
        }
    }

    /**
     * Checks if the player has defeated the end boss and won the game.
     * Displays a win overlay and plays the win sound.
     * @method checkWin
     */
    checkWin() {
        if (this.checkEndbossDead() && this.character.gameOver == false) {
            let overlayWin = document.getElementById('win_container');
            let canvas = document.getElementById('canvas');
            let mobileButtons = document.getElementById('mobile_buttons');
            let hud = document.getElementById('hud');

            mobileButtons.classList.add('d-none-i');
            canvas.classList.remove('d-block');
            overlayWin.classList.add('overlay-container');
            overlayWin.classList.remove('d-none');
            hud.classList.add('d-none-i');
            pauseSound('endboss_fight');
            playSound('win');
            this.clearAllIntervals();
        };
    }

    /**
     * Reduces the endboss's health when hit by a poison bubble.
     * @method hitEndboss
     */
    hitEndboss() {
        let boss = this.level.enemies.findLast((enemy) => enemy instanceof Endboss);
        boss.getHurt = true;
        boss.endbossHealth -= 15;
    }

    /**
     * Checks if the endboss is dead by comparing its health to zero.
     * @method checkEndbossDead
     * @returns {boolean} - True if the endboss is dead, false otherwise.
     */
    checkEndbossDead() {
        let boss = this.level.enemies.findLast((enemy) => enemy instanceof Endboss);
        if (boss.endbossHealth <= 0) {
            boss.endbossDead = true;
            return true;
        }
    }

    /**
     * Monitors the character's progress through the world and sets the endboss's state.
     * @method checkXCoord
     */
    checkXCoord() {
        let boss = this.level.enemies.findLast((enemy) => enemy instanceof Endboss);
        setInterval(() => {
            if (this.character.x > 5600) {
                boss.reachedXCoords = true;
            }
        }, 100);
    }

    /**
     * Clears all active intervals, effectively stopping game logic.
     * @method clearAllIntervals
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

    /**
     * Draws all the game objects (character, enemies, coins, etc.) onto the canvas.
     * This method is recursively called to create the game loop.
     * @method draw
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poision_bottles);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.barriar);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.poisionBar);
        this.addToMap(this.coinBar);
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);

        // Recursively calls the draw method to create the game loop
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds multiple objects to the game map for rendering.
     * @method addObjectsToMap
     * @param {Array} objects - Array of objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * Adds a single object to the game map and handles the flipping of the image if the object is facing the other direction.
     * @method addToMap
     * @param {MovableObject} mo - The object to be added to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image horizontally for an object moving in the opposite direction.
     * @method flipImage
     * @param {MovableObject} mo - The object to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the flipped image for an object moving back to its original direction.
     * @method flipImageBack
     * @param {MovableObject} mo - The object to restore its image direction.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}