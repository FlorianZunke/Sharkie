class JellyFish extends MovableObject {
    IMAGES_SWIM = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png',
    ];
    IMAGES_TRANSITION = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png',
    ];
    height = 100;
    width = 125;

    constructor(x, y, minY, maxY) {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png');
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_TRANSITION);
        this.x = x;
        this.y = y;
        this.minY = minY;
        this.maxY = maxY;
        this.speed = 1.2 + Math.random() * 0.3;

        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveVertical();
        }, 1000 / 60);
    
        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIM)
        }, 600);
    
        setInterval(() => {
            this.playAnimation(this.IMAGES_TRANSITION)
        }, 800);
    }
}
 