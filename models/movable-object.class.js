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


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }


    // isColliding(mo) {
    //     return (this.x + this.width) >= mo.x && this.x <= (mo.x + mo.width) &&
    //         (this.y + this.offsetY + this.height) >= mo.y &&
    //         (this.y + this.offsetY) <= (mo.y + mo.height) &&
    //         mo.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    // }


    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    isDead() {
        return this.energy == 0;
    }


    collectCoins() {
        this.coinPercentage += 20;
        if (this.coinPercentage >= 100) {
            this.coinPercentage = 100;
        }
    }


    collectBottles() {
        this.bottlePercentage += 20;
        if (this.bottlePercentage >= 100) {
            this.bottlePercentage = 100;
        }
    }

    moveHorizontal() {
        // Check if we should switch direction
        if (this.x <= this.minX) {
            this.otherDirection = true; // Move right
        } else if (this.x >= this.maxX) {
            this.otherDirection = false; // Move left
        }

        // Move the PufferFish based on direction
        if (this.otherDirection) {
            this.x += this.speed;
        } else {
            this.x -= this.speed;
        }
    }


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


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    shotBubbles() {
        setInterval(() => {
            if (world.keyboard.ATTACK_BUBBLE) {
                this.x += this.speedX;
                this.speedX += this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        return this.y < 195
    }
}