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
        // this.checkCollisions();
        this.checkAttackCollisions();
        this.run();
        this.timePassed();
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
            this.checkBarriarCollisions();
            this.checkGameOver();
            if (this.reachedXCoords) {
                this.endboss.reachedXCoords = true;
            }
        }, 400);
    };


    // checkCollisions() {
    //     setInterval(() => {

    //         this.level.enemies.forEach((enemy) => {
    //             if (this.character.isColliding(enemy)) {
    //                 if (enemy instanceof Endboss && !this.invincible) {
    //                     this.character.hit();
    //                     this.character.poisionHurt = false;
    //                     this.character.electricHurt = false;
    //                     this.healthBar.setPercentage(this.character.energy);
    //                 }
    //             }
    //         });
    //     }, 500);
    // };


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
                        if (enemy instanceof Endboss && this.invincible) {
                            this.endbossHealth -= 20;
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



    //checkBubbleCollision() {
    //     this.throwableObjects.forEach((bubble, index) => {
    //         level1.enemies.forEach((enemy, bubbleIndex) => {
    //             // Hier die Logik
    //             if(bubble.isColliding(enemy)) {
    //                 // Hier findet die Kollision statt
    //                 // Enemy löschen
    //             } 
    //         });
    //     });
    // };
    
    checkBubbleCollision() {
        this.throwableObjects.forEach((bubble, index) => {
            if (bubble.isColliding(this instanceof JellyFish)) {
                this.level.enemies.splice(index, 1);
            } else
                if (this.timePassed()) {
                    this.throwableObjects.splice(index, 1);
                }
        });
    };


    checkBarriarCollisions() {
        this.level.barriar.forEach(barriar => {
            if (this.character.isColliding(barriar)) {
                return true;
            }
        });
    };


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


    //checkThrowObjects() {
    //     if (this.keyboard.D && this.ammoStatusBar.itemCount > 0) {
    //         let ammo = new ThrowableObject(this.character.x + 160, this.character.y + 30);
    //         this.throwableObjects.push(ammo);
    //         this.ammoStatusBar.itemCount--;
    //         this.character.shoot_sound.play();
    //         setTimeout(() => {
    //             this.throwableObjects.splice(0, 1);
    //         }, 300)
    //     }
    // }
    checkThrowObjects() {
        if (this.character.otherDirection && this.keyboard.ATTACK_BUBBLE) {
            let bubble = new ThrowableObject(this.character.x, this.character.y + 160);
            this.throwableObjects.push(bubble);
        }
        if (!this.character.otherDirection && this.keyboard.ATTACK_BUBBLE) {
            let bubble = new ThrowableObject(this.character.x + 250, this.character.y + 160);
            this.throwableObjects.push(bubble);
        }
    };

    // Zeit wird muss weiter auf true bleiben bis ein Input passiert
    timePassed() {
        let timeNow = Date.now();

        if ((timeNow - this.time) >= 3000) {
            this.time = timeNow;
            return true;
        }

        return false;
    };


    checkGameOver() {
        if (this.character.isDead() && this.character.gameOver == true) {
            let overlayLose = document.getElementById('lose_container');
            overlayLose.classList.remove('d-none');
        }

        // if (this.checkEndbossDead() && this.character.gameOver == true) {
        //     let overlayWin = document.getElementById('win_container');
        //     overlayWin.classList.remove('d_none');
        // }
    };


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