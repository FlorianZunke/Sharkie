class PoisionBottle extends MovableObject {
    height = 85;
    width = 85;

    IMAGES_POISIONBOTTLE = [
        'img/4. Marcadores/Posión/Dark - Left.png',
        'img/4. Marcadores/Posión/Dark - Right.png'
    ];

    constructor(path, x, y) {
        super().loadImage(path);
        this.loadImages(this.IMAGES_POISIONBOTTLE);
        this.animate();
        this.x = x;
        this.y = y;
        this.offsetX = 10;
        this.offsetY = 6;
    }

    /**
     * Starts the animation of the poison bottle by alternating between the left and right images every 200ms.
     * This function is called automatically when a new instance of `PoisionBottle` is created.
     * 
     * @private
     * @returns {void}
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_POISIONBOTTLE);
        }, 200);
    }
}