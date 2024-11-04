let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    
    window.addEventListener('keydown', (event) => {
        
        if (event.keyCode == 32) {
            keyboard.UP = true;
        }

        if (event.keyCode == 65) {
            keyboard.LEFT = true;
        }

        if (event.keyCode == 68) {
            keyboard.RIGHT = true;
        }

        if (event.keyCode == 69) {
            keyboard.ATTACK_SLAP = true;
        }

        if (event.keyCode == 81) {
            keyboard.ATTACK_BUBBLE = true;
        }

        if (event.keyCode == 83) {
            keyboard.DOWN = true;
        }
    })

    window.addEventListener('keyup', (event) => {
        if (event.keyCode == 32) {
            keyboard.UP = false;
        }

        if (event.keyCode == 65) {
            keyboard.LEFT = false;
        }

        if (event.keyCode == 68) {
            keyboard.RIGHT = false;
        }

        if (event.keyCode == 69) {
            keyboard.ATTACK_SLAP = false;
        }

        if (event.keyCode == 81) {
            keyboard.ATTACK_BUBBLE = false;
        }

        if (event.keyCode == 83) {
            keyboard.DOWN = false;
        }
    })
}