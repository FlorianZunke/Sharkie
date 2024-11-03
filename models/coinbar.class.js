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

    setPercentage(coinPercentage) {
        this.coinPercentage = coinPercentage;
        let path = this.IMAGES_COIN[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.coinPercentage == 0) {
            return 0;
        } else if (this.coinPercentage <= 20) {
            return 1;
        } else if (this.coinPercentage <= 40) {
            return 2;
        } else if (this.coinPercentage <= 60) {
            return 3;
        } else if (this.coinPercentage <= 80) {
            return 4;
        } else {
            return 5
        }
    }
}