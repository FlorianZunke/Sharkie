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


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.checkAttackCollisions();
        this.run();
        this.timePassed();
    }


    setWorld() {
        this.character.world = this;
    }


    checkCollisions() {
        setInterval(() => {
            this.poisionHurt = false;
            this.electricHurt = false;
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    if (enemy instanceof PufferFish && !this.invincible) {
                        this.character.hit();
                        this.character.poisionHurt = true;
                        this.character.electricHurt = false;
                        this.healthBar.setPercentage(this.character.energy);
                    }

                    if (enemy instanceof JellyFish && !this.invincible) {
                        this.character.hit();
                        this.character.poisionHurt = false;
                        this.character.electricHurt = true;
                        this.healthBar.setPercentage(this.character.energy);
                    }

                    if (enemy instanceof Endboss && !this.invincible) {
                        this.character.hit();
                        this.character.poisionHurt = false;
                        this.character.electricHurt = false;
                        this.healthBar.setPercentage(this.character.energy);
                    }
                }
            });
        }, 500);
    };


    checkAttackCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy, index) => {
                if (this.character.isColliding(enemy)) {
                    if (this.keyboard.ATTACK_SLAP) {
                        this.invincible = true;
                        if (enemy instanceof PufferFish && this.invincible) {
                            this.level.enemies.splice(index, 1);
                        }
                        if (enemy instanceof JellyFish && this.invincible) {
                            this.level.enemies.splice(index, 1);
                        }
                        // if (enemy instanceof Endboss && this.invincible) {
                        //     this.level.enemies.index.health -= 20;
                        // }
                    }
                }
            });
        }, 50);
    };


    checkBarriarCollisions() {
        this.level.barriar.forEach(barriar => {
            if (this.character.isColliding(barriar)) {
                return true;
            }
        });
    }


    checkCoinCollions() {
        setInterval(() => {
            this.level.coins.forEach((coin, index) => {
                if (this.character.isColliding(coin)) {
                    this.character.collectCoins();
                    this.level.coins.splice(index, 1);
                    this.coinBar.setPercentage(this.character.coinPercentage);
                }
            });
        }, 1000);
    }


    checkPoisionBottleCollions() {
        setInterval(() => {
            this.level.poision_bottles.forEach((bottle, index) => {
                if (this.character.isColliding(bottle)) {
                    this.character.collectBottles();
                    this.level.poision_bottles.splice(index, 1);
                    this.poisionBar.setPercentage(this.character.bottlePercentage);
                }
            });
        }, 1000);
    }


    checkThrowObjects() {
        if (this.character.otherDirection && this.keyboard.ATTACK_BUBBLE) {
            let bubble = new ThrowableObject(this.character.x, this.character.y + 160);
            this.throwableObjects.push(bubble);
        }
        if (!this.character.otherDirection && this.keyboard.ATTACK_BUBBLE) {
            let bubble = new ThrowableObject(this.character.x + 250, this.character.y + 160);
            this.throwableObjects.push(bubble);
        }
    }


    timePassed() {
        let startTime = Date.now();
        return () => {
            let currentTime = Date.now();
            return currentTime - startTime >= 5000;
        };
    }


    run() {
        setInterval(() => {
            this.checkCoinCollions();
            this.checkPoisionBottleCollions();
            this.checkThrowObjects();
            this.checkBarriarCollisions();
            this.timePassed();

            if (this.reachedXCoords) {
                this.endboss.reachedXCoords = true;
            }
        }, 400);
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
    }


    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }



}