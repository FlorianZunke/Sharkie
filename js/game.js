let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    let startPage = document.getElementById('start_screen');
    startPage.classList.add('d-none');

    let tutorialPage = document.getElementById('key_container');
    tutorialPage.classList.add('key-containers');
};


function startGame() {
    let tutorialPage = document.getElementById('tutorial_container');
    tutorialPage.classList.add('d-none');

    let game = document.getElementById('fullscreen');
    game.classList.remove('d-none')

    canvas = document.getElementById('canvas');
    canvas.classList.add('d-block');

    world = new World(canvas, keyboard);
};