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
    endbossHealth = 100;
    endbossDead = false;
    jellyFishDead = false;
    gameOver = false;



    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    };


    isColliding(mo) {
        return (this.x + this.offsetX + this.width - 2 * (this.offsetX)) >= mo.x && this.x <= (mo.x + mo.width) &&
            (this.y + 2 * (this.offsetY) + this.height - 3 * (this.offsetY)) >= mo.y &&
            (this.y + 2 * (this.offsetY)) <= (mo.y + mo.height);
    };


    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    };


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000
        return timepassed < 1;
    };


    isDead() {
        return this.energy == 0;
    };


    collectCoins() {
        this.coinPercentage += 20;
        if (this.coinPercentage >= 100) {
            this.coinPercentage = 100;
        }
    };


    collectBottles() {
        this.bottlePercentage += 20;
        if (this.bottlePercentage >= 100) {
            this.bottlePercentage = 100;
            this.poisionBubble = true;
        }
    };

    moveHorizontal() {
        // Check if we should switch direction
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
    };


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
    };


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 25);
    };


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 195
        }
    };
};