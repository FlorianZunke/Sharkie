class PufferFish extends MovableObject {
    IMAGES_SWIM = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png',
    ];
    IMAGES_TRANSITION = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition5.png',
    ];
    height = 100;
    width = 125;

    constructor(x, y, minX, maxX) {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png');
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_TRANSITION);
        this.x = x;
        this.y = y;
        this.minX = minX;
        this.maxX = maxX;
        this.offsetX = 0;
        this.offsetY = 0;
        this.speed = 2.5 + Math.random() * 0.7;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveHorizontal();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIM)
        }, 200);

        setInterval(() => {
            this.playAnimation(this.IMAGES_TRANSITION)
        }, 400);
    }
}