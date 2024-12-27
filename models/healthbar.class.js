class HealthBar extends DrawableObject {
    percentage = 100;

    IMAGES_HEALTH = [
        'img/4. Marcadores/green/Life/0_  copia 3.png',
        'img/4. Marcadores/green/Life/20_ copia 4.png',
        'img/4. Marcadores/green/Life/40_  copia 3.png',
        'img/4. Marcadores/green/Life/60_  copia 3.png',
        'img/4. Marcadores/green/Life/80_  copia 3.png',
        'img/4. Marcadores/green/Life/100_  copia 2.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 20;
        this.y = 0;
        this.height = 50;
        this.width = 200;
        this.setPercentage(100);
    }

    /**
     * Updates the health bar to display the current health percentage.
     * Changes the image based on the percentage value.
     * 
     * @param {number} percentage - The current health percentage (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the correct image index based on the current health percentage.
     * This determines which image to display from the `IMAGES_HEALTH` array.
     * 
     * @returns {number} The index of the image corresponding to the current health percentage.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5; // 100% health
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0; // 0% health
        }
    }
}