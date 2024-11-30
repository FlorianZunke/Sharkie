let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    let startPage = document.getElementById('start_screen');
    startPage.classList.add('d-none');

    let tutorialPage = document.getElementById('key_container');
    tutorialPage.classList.add('key-containers');
}


function startGame() {
    let tutorialPage = document.getElementById('tutorial_container');
    tutorialPage.classList.add('d-none');

    canvas = document.getElementById('canvas');
    canvas.classList.add('d-block');

    world = new World(canvas, keyboard);
}
  
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
})

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
})