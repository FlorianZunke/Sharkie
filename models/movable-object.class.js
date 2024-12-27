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
    energy = 100;
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

    /**
 * Checks for collisions with barriers and updates the collision states
 * (top, bottom, left, right) based on the smallest overlap.
 */
    isCollidingWithBarrier() {
        this.resetCollisionStates();

        world.level.barriar.forEach(barriar => {
            if (world.character.isColliding(barriar)) {
                const smallestOverlap = this.calculateSmallestOverlap(barriar);

                this.updateCollisionState(smallestOverlap);
            }
        });
    }

    /**
     * Resets all collision states to false, indicating no contact with any barrier.
     */
    resetCollisionStates() {
        this.collisiontop = false;
        this.collisionleft = false;
        this.collisionright = false;
        this.collisionbottom = false;
    }

    /**
     * Calculates the smallest overlap between the current instance and a given barrier.
     * This is used to determine the direction of the collision.
     * 
     * @param {Barriar} barriar - The barrier object being collided with.
     * @returns {Object} An object containing the collision direction (`top`, `bottom`, `left`, or `right`)
     * and the corresponding overlap value.
     */
    calculateSmallestOverlap(barriar) {
        const overlapTop = this.y + this.hitboxTop - (barriar.y + barriar.height - barriar.hitboxBottom);
        const overlapBottom = (this.y + this.height - this.hitboxBottom) - (barriar.y + barriar.hitboxTop);
        const overlapLeft = this.x + this.hitboxLeft - (barriar.x + barriar.width - barriar.hitboxRight);
        const overlapRight = (this.x + this.width - this.hitboxRight) - (barriar.x + barriar.hitboxLeft);

        const overlaps = [
            { direction: 'top', value: overlapTop },
            { direction: 'bottom', value: overlapBottom },
            { direction: 'left', value: overlapLeft },
            { direction: 'right', value: overlapRight }
        ];

        return overlaps.reduce((min, current) =>
            Math.abs(current.value) < Math.abs(min.value) ? current : min
        );
    }

    /**
     * Updates the collision state for a specific direction based on the smallest overlap.
     * 
     * @param {Object} smallestOverlap - An object containing the direction (`top`, `bottom`, 
     * `left`, or `right`) and the value of the smallest overlap.
     */
    updateCollisionState(smallestOverlap) {
        switch (smallestOverlap.direction) {
            case 'top':
                this.collisiontop = true;
                break;
            case 'bottom':
                this.collisionbottom = true;
                break;
            case 'left':
                this.collisionleft = true;
                break;
            case 'right':
                this.collisionright = true;
                break;
        }
    }

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
