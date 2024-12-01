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
        // this.checkCollisions();
        this.checkAttackCollisions();
        this.run();
        this.timePassed();
    }


    setWorld() {
        this.character.world = this;
    }


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
                        this.character.hit();
                        this.character.poisionHurt = true;
                        this.character.electricHurt = false;
                        this.healthBar.setPercentage(this.character.energy);
                    }
                    // if Bedingung stimmt noch nicht ganz, muss gefragt werden ob die geschossen Bubble mit JellyFish kolliediert
                    if (enemy instanceof JellyFish) {
                        if (enemy instanceof JellyFish ) {
                            this.level.enemies.splice(index, 1);
                        }
                    }
                }
            });
        }, 500);
    };

    // Muss noch überarbeitet werden, funktioniert noch nicht richtig
    checkBubbleCollision() {
        setInterval(() => {
            this.throwableObjects.forEach((bubble, index) => {
                if (bubble.isColliding(this.level.enemies)) {
                    console.log('Gegner getroffen');
                }
            });
        }, 50);
    }

    
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
        }, 800);
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
        }, 800);
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

    // Muss auch nochmal angeguckt werden, die Zeit abfrage passt noch nicht ganz
    timePassed() {
        let startTime = Date.now();
        return () => {
            let currentTime = Date.now();
            return startTime - currentTime >= 5000;
        };
    }


    run() {
        setInterval(() => {
            this.checkCoinCollions();
            this.checkPoisionBottleCollions();
            this.checkThrowObjects();
            this.checkGameOver();
            this.checkBubbleCollision();
            this.checkBarriarCollisions();
            this.timePassed();

            if (this.reachedXCoords) {
                this.endboss.reachedXCoords = true;
            }
        }, 400);
    }


    checkGameOver() {
        setInterval(() => {
            if (this.character.isDead() && this.character.gameOver == true) {
                let overlayLose = document.getElementById('lose_container');
                overlayLose.classList.remove('d-none');
            }

            // if (this.checkEndbossDead() && this.character.gameOver == true) {
            //     let overlayWin = document.getElementById('win_container');
            //     overlayWin.classList.remove('d_none');
            // }
        }, 100);
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