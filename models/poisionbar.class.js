class Poisionbar extends DrawableObject {
    IMAGES_POISON = [
        'img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png',
        'img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_POISON);
        this.x = 20;
        this.y = 80;
        this.height = 50;
        this.width = 200;
        this.setPercentage(0);
    }

    /**
     * Sets the poison bottle's percentage and updates the displayed image accordingly.
     * 
     * @param {number} bottlePercentage - The percentage value representing the current poison level.
     *                                     Should be a number between 0 and 100.
     * @returns {void}
     */
    setPercentage(bottlePercentage) {
        this.bottlePercentage = bottlePercentage;
        let path = this.IMAGES_POISON[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the current poison bottle percentage.
     * 
     * @returns {number} The index of the image in the `IMAGES_POISON` array.
     */
    resolveImageIndex() {
        if (this.bottlePercentage == 0) {
            return 0;
        } else if (this.bottlePercentage <= 20) {
            return 1;
        } else if (this.bottlePercentage <= 40) {
            return 2;
        } else if (this.bottlePercentage <= 60) {
            return 3;
        } else if (this.bottlePercentage <= 80) {
            return 4;
        } else {
            return 5;
        }
    }
}