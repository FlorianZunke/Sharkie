class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    ATTACK_SLAP = false;
    ATTACK_BUBBLE = false;

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