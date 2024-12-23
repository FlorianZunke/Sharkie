/**
 * Represents a coin bar that visually indicates the player's coin collection progress.
 * The bar updates its appearance based on the percentage of coins collected.
 * 
 * @class CoinBar
 * @extends DrawableObject
 */
class CoinBar extends DrawableObject {
    
    /**
     * An array of image paths representing different stages of the coin bar based on the coin percentage.
     * @type {string[]}
     */
    IMAGES_COIN = [
        'img/4. Marcadores/green/Coin/0_  copia 4.png',
        'img/4. Marcadores/green/Coin/20_  copia 2.png',
        'img/4. Marcadores/green/Coin/40_  copia 4.png',
        'img/4. Marcadores/green/Coin/60_  copia 4.png',
        'img/4. Marcadores/green/Coin/80_  copia 4.png',
        'img/4. Marcadores/green/Coin/100_ copia 4.png'
    ];

    /**
     * Initializes the CoinBar with default properties and sets the initial coin percentage to 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN); // Load all images for the coin bar
        this.x = 20;                      // Position the coin bar on the x-axis
        this.y = 40;                      // Position the coin bar on the y-axis
        this.height = 50;                 // Set the height of the coin bar
        this.width = 200;                 // Set the width of the coin bar
        this.setPercentage(0);            // Set the initial coin percentage to 0
    }

    /**
     * Updates the coin bar's appearance based on the current coin percentage.
     * 
     * @param {number} coinPercentage - The current percentage of coins collected (0-100).
     */
    setPercentage(coinPercentage) {
        this.coinPercentage = coinPercentage;
        let path = this.IMAGES_COIN[this.resolveImageIndex()]; // Determine the appropriate image based on the percentage
        this.img = this.imageCache[path]; // Update the current image of the coin bar
    }

    /**
     * Resolves the appropriate image index based on the current coin percentage.
     * 
     * @returns {number} - The index of the image in the `IMAGES_COIN` array.
     */
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
            return 5; // 100% coins
        }
    }
}