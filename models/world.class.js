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
    throwableObjects = [new ThrowableObject()];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.checkCoinCollions();
        this.checkPoisionBottleCollions();
        // this.checkTime();
    }


    setWorld() {
        this.character.world = this;
    }


    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.healthBar.setPercentage(this.character.energy)
                }
            });
        }, 500);
    };


    //Spliced noch die falschen Flaschen bzw Coins wenn man eine nicht eingesammelt hat
    checkCoinCollions() {
        setInterval(() => {
            this.level.coins.forEach((coin) => {
                if (this.character.isColliding(coin)) {
                    this.character.collectCoins();
                    this.level.coins.splice(coin, 1);
                    this.coinBar.setPercentage(this.character.coinPercentage);
                }
            });
        }, 500);
    }


    checkPoisionBottleCollions() {
        setInterval(() => {
            this.level.poision_bottles.forEach((bottle) => {
                if (this.character.isColliding(bottle)) {
                    this.character.collectBottles();
                    this.level.poision_bottles.splice(bottle, 1);
                    this.poisionBar.setPercentage(this.character.bottlePercentage);
                }
            });
        }, 500);
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


    // checkTime() {
    //     let time = 0;
        
    //     setInterval(() => {
    //         if (!this.keyboard) {
    //             time = time + 1;
    //             console.log(time);
    //         } else {
    //             time = 0;
    //             console.log(time);
    //         } 
    //     }, 200); 

    //     setInterval(() => {
    //         if(!this.keyboard && time > 20) {
    //             console.log('5 seconds passed with no Input');
    //         }
    //     }, 200);
    // }
}