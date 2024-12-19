class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    ATTACK_SLAP = false;
    ATTACK_BUBBLE = false;

    constructor() {
        this.bindKeyPressEvents();
        // this.bindBtsPressEvents();
    };

    bindBtsPressEvents() {
        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });

        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });

        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        document.getElementById('btnUp').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });

        document.getElementById('btnUp').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        document.getElementById('btnSlap').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });

        document.getElementById('btnSlap').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        document.getElementById('btnBubble').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });

        document.getElementById('btnBubble').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        
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