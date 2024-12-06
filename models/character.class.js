class Character extends MovableObject {
    world;
    y = 100;
    speed = 11;
    poisionHurt = false;
    electricHurt = false;
    IMAGES_IDLE = [
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
    ];
    IMAGES_SLEEP = [
        'img/1.Sharkie/2.Long_IDLE/i1.png',
        'img/1.Sharkie/2.Long_IDLE/I2.png',
        'img/1.Sharkie/2.Long_IDLE/I3.png',
        'img/1.Sharkie/2.Long_IDLE/I4.png',
        'img/1.Sharkie/2.Long_IDLE/I5.png',
        'img/1.Sharkie/2.Long_IDLE/I6.png',
        'img/1.Sharkie/2.Long_IDLE/I7.png',
        'img/1.Sharkie/2.Long_IDLE/I8.png',
        'img/1.Sharkie/2.Long_IDLE/I9.png',
        'img/1.Sharkie/2.Long_IDLE/I10.png',
        'img/1.Sharkie/2.Long_IDLE/I11.png',
        'img/1.Sharkie/2.Long_IDLE/I12.png',
        'img/1.Sharkie/2.Long_IDLE/I13.png',
        'img/1.Sharkie/2.Long_IDLE/I14.png',
    ];
    IMAGES_SWIM = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];
    IMAGES_DEAD = [
        'img/1.Sharkie/6.dead/2.Electro_shock/1.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/2.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/4.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/5.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/7.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/8.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/9.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/10.png'
    ];
    IMAGES_POISON_HURT = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/5.png'
    ];
    IMAGES_ELECTRIC_HURT = [
        'img/1.Sharkie/5.Hurt/2.ElectricShock/1.png',
        'img/1.Sharkie/5.Hurt/2.ElectricShock/3.png',
        'img/1.Sharkie/5.Hurt/2.ElectricShock/1.png',
        'img/1.Sharkie/5.Hurt/2.ElectricShock/3.png',
        'img/1.Sharkie/5.Hurt/2.ElectricShock/1.png',
        'img/1.Sharkie/5.Hurt/2.ElectricShock/3.png'
    ];
    IMAGES_ATTACK_SLAP = [
        'img/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/1.Sharkie/4.Attack/Fin slap/4.png',
        'img/1.Sharkie/4.Attack/Fin slap/5.png',
        'img/1.Sharkie/4.Attack/Fin slap/6.png',
        'img/1.Sharkie/4.Attack/Fin slap/7.png',
        'img/1.Sharkie/4.Attack/Fin slap/8.png',
    ];
    IMAGES_ATTACK_BUBBLE = [
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png',
    ];

    constructor() {
        super().loadImage('img/1.Sharkie/1.IDLE/1.png'),
            this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_POISON_HURT);
        this.loadImages(this.IMAGES_ELECTRIC_HURT);
        this.loadImages(this.IMAGES_ATTACK_SLAP);
        this.loadImages(this.IMAGES_ATTACK_BUBBLE);
        this.offsetX = 50;
        this.offsetY = 60;
        this.animate();
        this.applyGravity();
        this.checkXCoord();
    }

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.gameOver = true;
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt() && this.poisionHurt) {
                this.playAnimation(this.IMAGES_POISON_HURT);
            } else if (this.isHurt() && this.electricHurt) {
                this.playAnimation(this.IMAGES_ELECTRIC_HURT);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_POISON_HURT);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                    this.playAnimation(this.IMAGES_SWIM);
                } else if (this.world.timePassed()) {
                    this.playAnimation(this.IMAGES_SLEEP);
                } else {
                    this.playAnimation(this.IMAGES_IDLE);
                }
            }
        }, 150);

        setInterval(() => {
            if (this.world.keyboard.ATTACK_SLAP) {
                this.playAnimation(this.IMAGES_ATTACK_SLAP);
            }

            if (this.world.keyboard.ATTACK_BUBBLE) {
                this.playAnimation(this.IMAGES_ATTACK_BUBBLE);

            }
        }, 90);

        // Die CheckBarriarCollisions einbauen
        setInterval(() => {
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.x += this.speed;
                    this.otherDirection = false;
                }
    
                if (this.world.keyboard.LEFT && this.x > 0) {
                    this.x -= this.speed;
                    this.otherDirection = true;
                }
    
                if (this.world.keyboard.UP && this.speedY < 0) {
                    this.speedY = 5;
                }
    
                this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.UP && this.y > -150) {
                this.y -= this.speed;
            }

            if (this.world.keyboard.DOWN && this.y < 215) {
                this.y += this.speed;
            }
        }, 1000 / 60);
    };


    checkXCoord() {
        setInterval(() => {
            if (this.x > 5600) {
                this.world.level.enemies[2].reachedXCoords = true;
            }
        }, 100);
    };
};