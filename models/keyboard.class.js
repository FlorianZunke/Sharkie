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
        
            if (event.keyCode == 32) {
                keyboard.ATTACK_SLAP = true;
            }
        
            if (event.keyCode == 68) {
                keyboard.ATTACK_BUBBLE = true;
            }
        
            if (event.keyCode == 40) {
                keyboard.DOWN = true;
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
        
            if (event.keyCode == 32) {
                keyboard.ATTACK_SLAP = false;
            }
        
            if (event.keyCode == 68) {
                keyboard.ATTACK_BUBBLE = false;
            }
        
            if (event.keyCode == 40) {
                keyboard.DOWN = false;
            }
        });
    };
};