let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (event) => {
    if (event.keyCode == 65) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 68){
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 32) {
        keyboard.UP = true;
    }
})

window.addEventListener('keyup', (event) => {
    if (event.keyCode == 65) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 68){
        keyboard.RIGHT = false;
    }
    
    if (event.keyCode == 32) {
        keyboard.UP = false;
    }
})