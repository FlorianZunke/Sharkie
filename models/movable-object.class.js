/**
 * Represents a movable object in the game world, extending the drawable object.
 * Handles movement, collision detection, and game state interactions.
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    speedX = 0;
    acceleration = 1.75;
    energy = 100000000;
    coinPercentage = 0;
    bottlePercentage = 0;
    lastHit = 0;
    lastCollect = 0;
    poisionBubble = false;
    endbossDead = false;
    endbossHealth = 100;
    gameOver = false;
    collisiontop = false;
    collisionleft = false;
    collisionright = false;
    collisionbottom = false;

    /**
     * Plays an animation by cycling through a list of image paths.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Checks if this object is colliding with another object.
     * @param {MovableObject} mo - The other movable object to check for collision.
     * @returns {boolean} True if the objects are colliding; otherwise, false.
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.hitboxRight > mo.x + mo.hitboxLeft && 
            this.y + this.height - this.hitboxBottom > mo.y + mo.hitboxTop &&
            this.x + this.hitboxLeft < mo.x + mo.width - mo.hitboxRight && 
            this.y + this.hitboxTop < mo.y + mo.height - mo.hitboxBottom
        );
    }

    // /**
    //  * Checks if this object is colliding with another object.
    //  * @param {MovableObject} mo - The other movable object to check for collision.
    //  * @returns {boolean} True if the objects are colliding; otherwise, false.
    //  */
    // isColliding(mo) {
    //     return (
    //         (this.x + this.offsetX + this.width - 2 * this.offsetX) >= mo.x &&
    //         this.x + this.offsetX <= (mo.x + mo.width) &&
    //         (this.y + 2 * this.offsetY + this.height - 3 * this.offsetY) >= mo.y &&
    //         (this.y + 2 * this.offsetY) <= (mo.y + mo.height)
    //     );
    // }

    /**
     * Continuously checks if the character is colliding with barriers and updates collision flags.
     */
    isCollidingWithBarrier() {
        setInterval(() => {
            this.collisiontop = false;
            this.collisionleft = false;
            this.collisionright = false;
            this.collisionbottom = false;

            world.level.barriar.forEach(barriar => {
                if (world.character.isColliding(barriar)) {
                    if (this.y + this.hitboxTop < barriar.y + barriar.height - barriar.hitboxBottom) {
                        console.log('top');
                        this.collisiontop = true;
                    }
                    if (this.x + this.hitboxLeft < barriar.x + barriar.width - barriar.hitboxRight) {
                        this.collisionleft = true;
                        console.log('links');
                    }
                    if (this.x + this.width - this.hitboxRight > barriar.x + barriar.hitboxLeft) {
                        this.collisionright = true;
                        console.log('rechts');
                    }
                    if (this.y + this.height - this.hitboxBottom > barriar.y - barriar.hitboxTop) {
                        this.collisionbottom = true;
                        console.log('unten');
                    }
                }
            });
        }, 10);
    }

    // /**
    //  * Continuously checks if the character is colliding with barriers and updates collision flags.
    //  */
    // isCollidingWithBarrier() {
    //     setInterval(() => {
    //         this.collisiontop = false;
    //         this.collisionleft = false;
    //         this.collisionright = false;
    //         this.collisionbottom = false;

    //         world.level.barriar.forEach(barriar => {
    //             if (world.character.isColliding(barriar)) {
    //                 if (world.character.y + 2 * this.offsetY + world.character.height -
    //                     3 * this.offsetY + world.character.width >= barriar.y) {
    //                     this.collisiontop = true;
    //                 }
    //                 if (world.character.x + world.character.width <= barriar.x + barriar.width) {
    //                     this.collisionright = true;
    //                 }
    //                 if (world.character.x + world.character.width >= barriar.x + barriar.width) {
    //                     this.collisionleft = true;
    //                 }
    //                 if (world.character.height <= barriar.y + barriar.height) {
    //                     this.collisionbottom = true;
    //                 }
    //             }
    //         });
    //     }, 10);
    // }

    /**
     * Reduces the object's energy by 20 and triggers a "hurt" animation.
     * Plays a sound effect if energy decreases.
     */
    hit() {
        this.energy -= 20;
        playSound('hurt');
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is currently in a "hurt" state based on recent damage.
     * @returns {boolean} True if the object is hurt; otherwise, false.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks if the object is dead (i.e., energy has reached 0).
     * @returns {boolean} True if the object is dead; otherwise, false.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Increases the object's coin collection percentage by 20.
     * Caps the percentage at 100.
     */
    collectCoins() {
        this.coinPercentage += 20;
        if (this.coinPercentage >= 100) {
            this.coinPercentage = 100;
        }
    }

    /**
     * Increases the object's bottle collection percentage by 20.
     * Caps the percentage at 100 and activates poison bubble ability.
     */
    collectBottles() {
        this.bottlePercentage += 20;
        if (this.bottlePercentage >= 100) {
            this.bottlePercentage = 100;
            this.poisionBubble = true;
        }
    }

    /**
     * Moves the object horizontally, switching direction at boundaries.
     */
    moveHorizontal() {
        if (this.x <= this.minX) {
            this.otherDirection = true; // Move right
        } else if (this.x >= this.maxX) {
            this.otherDirection = false; // Move left
        }

        if (this.otherDirection) {
            this.x += this.speed;
        } else {
            this.x -= this.speed;
        }
    }

    /**
     * Moves the object vertically, switching direction at boundaries.
     */
    moveVertical() {
        if (this.y <= this.minY) {
            this.otherDirection = false;
        } else if (this.y >= this.maxY) {
            this.otherDirection = true;
        }

        if (this.otherDirection) {
            this.y -= this.speed;
        } else {
            this.y += this.speed;
        }
    }

    /**
     * Checks if the object is above the ground.
     * Throwable objects are always considered above ground.
     * @returns {boolean} True if the object is above ground; otherwise, false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 195;
        }
    }
}
