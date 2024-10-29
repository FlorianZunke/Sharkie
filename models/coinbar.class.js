class CoinBar extends DrawableObject {
    IMAGES_COIN = [
        'img/4. Marcadores/green/Coin/0_  copia 4.png',
        'img/4. Marcadores/green/Coin/20_  copia 2.png',
        'img/4. Marcadores/green/Coin/40_  copia 4.png',
        'img/4. Marcadores/green/Coin/60_  copia 4.png',
        'img/4. Marcadores/green/Coin/80_  copia 4.png',
        'img/4. Marcadores/green/Coin/100_ copia 4.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.x = 20;
        this.y = 40;
        this.height = 50;
        this.width = 200;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COIN[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage >= 19) {
            return 1;
        } else if (this.percentage >= 39) {
            return 2;
        } else if (this.percentage >= 59) {
            return 3;
        } else if (this.percentage >= 79) {
            return 4;
        } else {
            return 5
        }
    }
}