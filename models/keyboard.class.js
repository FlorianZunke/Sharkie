/**
 * The Keyboard class handles keyboard input for game controls.
 * It tracks the state of specific keys and provides boolean flags
 * indicating whether a key is pressed or not.
 */
class Keyboard {
    /**
     * @property {boolean} LEFT - True if the left arrow key is pressed.
     * @property {boolean} RIGHT - True if the right arrow key is pressed.
     * @property {boolean} UP - True if the up arrow key is pressed.
     * @property {boolean} DOWN - True if the down arrow key is pressed.
     * @property {boolean} ATTACK_SLAP - True if the spacebar key is pressed (used for attack).
     * @property {boolean} ATTACK_BUBBLE - True if the "D" key is pressed (used for attack).
     */
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    ATTACK_SLAP = false;
    ATTACK_BUBBLE = false;

    /**
     * Constructs a Keyboard instance and initializes the event listeners
     * for handling key press and release events.
     */
    constructor() {
        this.bindKeyPressEvents();
    };

    /**
     * Binds event listeners to handle `keydown` and `keyup` events.
     * Updates the corresponding properties to indicate the key state.
     * 
     * @private
     */
    bindKeyPressEvents() {
        window.addEventListener('keydown', (event) => {
        
            if (event.keyCode == 38) {
                keyboard.UP = true;
            }
        
            if (event.keyCode == 37) {
                keyboard.LEFT = true;
            }
        
            if (event.keyCode == 39) {
                keyboard.RIGHT = true;
            }

            if (event.keyCode == 40) {
                keyboard.DOWN = true;
            }
        
            if (event.keyCode == 32) {
                keyboard.ATTACK_SLAP = true;
            }
        
            if (event.keyCode == 68) {
                keyboard.ATTACK_BUBBLE = true;
            }
        });
        
        window.addEventListener('keyup', (event) => {
            if (event.keyCode == 38) {
                keyboard.UP = false;
            }
        
            if (event.keyCode == 37) {
                keyboard.LEFT = false;
            }
        
            if (event.keyCode == 39) {
                keyboard.RIGHT = false;
            }
            
            if (event.keyCode == 40) {
                keyboard.DOWN = false;
            }
        
            if (event.keyCode == 32) {
                keyboard.ATTACK_SLAP = false;
            }
        
            if (event.keyCode == 68) {
                keyboard.ATTACK_BUBBLE = false;
            }
        });
    };
};