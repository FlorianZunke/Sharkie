let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];


function init() {
    let startPage = document.getElementById('start_screen');
    startPage.classList.add('d-none');

    let tutorialPage = document.getElementById('key_container');
    tutorialPage.classList.add('overlay-container');
    startLevel();
};


function startGame() {
    let tutorialPage = document.getElementById('key_container');
    tutorialPage.classList.add('d-none-i');

    let game = document.getElementById('fullscreen');
    game.classList.remove('d-none');

    let mobileButtons = document.getElementById('mobile_buttons');
    mobileButtons.classList.remove('d-none');

    canvas = document.getElementById('canvas');
    canvas.classList.add('d-block');

    world = new World(canvas, keyboard);
};


function showKeyControlls() {
    let tutorialPage = document.getElementById('tutorial_container');
    tutorialPage.classList.remove('d-none');

    let canvas = document.getElementById('canvas');
    canvas.classList.remove('d-block');

    let mobileButtons = document.getElementById('mobile_buttons');
    mobileButtons.classList.add('d-none');

    let hud = document.getElementById('hud');
    hud.classList.add('d-none');
}

function closeKeyControlls() {
    let tutorialPage = document.getElementById('tutorial_container');
    tutorialPage.classList.add('d-none');

    let canvas = document.getElementById('canvas');
    canvas.classList.add('d-block');

    let mobileButtons = document.getElementById('mobile_buttons');
    mobileButtons.classList.remove('d-none');

    let hud = document.getElementById('hud');
    hud.classList.remove('d-none');
}


function restartGame() {
    let overlayLose = document.getElementById('lose_container');
    let tutorialPage = document.getElementById('key_container');
    tutorialPage.classList.remove('d-none-i');
    overlayLose.classList.remove('overlay-container');
    init();
}


function playAgain() {
    let overlayWin = document.getElementById('win_container');
    let tutorialPage = document.getElementById('key_container');
    tutorialPage.classList.remove('d-none-i');
    overlayWin.classList.remove('overlay-container');
    init();
}


function toogleMusic() {
    
}