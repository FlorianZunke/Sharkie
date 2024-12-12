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


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkAttackCollisions();
        this.checkBarriarCollisions();
        this.run();
    };


    setWorld() {
        this.character.world = this;
    };


    run() {
        setInterval(() => {
            this.checkCoinCollions();
            this.checkPoisionBottleCollions();
            this.checkThrowObjects();
            this.checkBubbleCollision();
            this.checkGameOver();
            if (this.reachedXCoords) {
                this.endboss.reachedXCoords = true;
            }
        }, 400);
    };


    checkAttackCollisions() {
        setInterval(() => {
            this.poisionHurt = false;
            this.electricHurt = false;
            this.level.enemies.forEach((enemy, index) => {
                if (this.character.isColliding(enemy)) {
                    this.invincible = false;
                    if (this.keyboard.ATTACK_SLAP) {
                        this.invincible = true;
                        if (enemy instanceof PufferFish && this.invincible) {
                            this.level.enemies.splice(index, 1);
                        }
                    } else {
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
                };
            })
        }, 500);
    };


    checkBubbleCollision() {
        this.throwableObjects.forEach((bubble) => {
            level1.enemies.forEach((enemy, enemyIndex) => {
                if (bubble.isColliding(enemy) && enemy instanceof JellyFish) {
                    this.level.enemies.splice(enemyIndex, 1);
                    this.throwableObjects.splice(0, 1);
                }
                if (bubble.isColliding(enemy) && enemy instanceof Endboss && this.character.poisionBubble) {
                    this.character.endbossHealth -= 20;
                    this.throwableObjects.splice(0, 1);
                }
            });
        });
    };


    checkBarriarCollisions() {
        setInterval(() => {
            let blockedDirections = { left: false, right: false, up: false, down: false };

            this.level.barriar.forEach(barriar => {
                if (this.character.isColliding(barriar)) {
                    if (
                        (this.character.x + this.character.offsetX + this.character.width - 2 * this.character.offsetX) >= (barriar.x + barriar.offsetX) &&
                        (this.character.x + this.character.offsetX) < (barriar.x + barriar.width - barriar.offsetX)
                    ) {
                        // Horizontale Blockaden
                        blockedDirections.right = this.character.x < barriar.x; // Rechtskollision
                        blockedDirections.left = this.character.x > barriar.x;  // Linkskollision
                    }

                    if (
                        (this.character.y + this.character.offsetY + this.character.height - 3 * this.character.offsetY) >= (barriar.y + barriar.offsetY) &&
                        (this.character.y + this.character.offsetY) < (barriar.y + barriar.height - 2 * barriar.offsetY)
                    ) {
                        // Vertikale Blockaden
                        blockedDirections.down = this.character.y < barriar.y; // Untenkollision
                        blockedDirections.up = this.character.y > barriar.y;   // Obenkollision
                    }
                }
            });

            this.character.blockedDirections = blockedDirections;
        }, 10);
    }


    checkCoinCollions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoins();
                this.level.coins.splice(index, 1);
                this.coinBar.setPercentage(this.character.coinPercentage);
            }
        });
    };


    checkPoisionBottleCollions() {
        this.level.poision_bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottles();
                this.level.poision_bottles.splice(index, 1);
                this.poisionBar.setPercentage(this.character.bottlePercentage);
            }
        });
    };


    checkThrowObjects() {
        if (this.character.otherDirection && this.keyboard.ATTACK_BUBBLE) {
            let bubble = new ThrowableObject(this.character.x, this.character.y + 160);
            this.throwableObjects.push(bubble);
            setTimeout(() => {
                this.throwableObjects.splice(0, 1);
            }, 2000)
        }
        if (!this.character.otherDirection && this.keyboard.ATTACK_BUBBLE) {
            let bubble = new ThrowableObject(this.character.x + 250, this.character.y + 160);
            this.throwableObjects.push(bubble);
            setTimeout(() => {
                this.throwableObjects.splice(0, 1);
            }, 2000)
        }
    };


    checkGameOver() {
        if (this.character.isDead() && this.character.gameOver == true) {
            let overlayLose = document.getElementById('lose_container');
            let canvas = document.getElementById('canvas');
            canvas.classList.remove('d-block');
            overlayLose.classList.add('overlay-container');
            this.clearAllIntervals();
        }

        if (this.checkEndbossDead() && this.character.gameOver == false) {
            let overlayWin = document.getElementById('win_container');
            let canvas = document.getElementById('canvas');
            canvas.classList.remove('d-block');
            overlayWin.classList.add('overlay-container');
            this.clearAllIntervals();
        };
    };


    checkEndbossDead() {
        if (this.character.endbossHealth <= 0) {
            this.character.endbossDead = true;
            return true;
        }
    };


    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }


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

        // Draw() wird immer wieder aufgerufen (Abhängig von der Leistung der Grafikkarte)
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    };


    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    };


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    };


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    };


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    };
};