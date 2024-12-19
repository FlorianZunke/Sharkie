let canvas;
let world;
let keyboard = new Keyboard();


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
    mobileButtons.classList.add('d-none-i');
}

function closeKeyControlls() {
    let tutorialPage = document.getElementById('tutorial_container');
    tutorialPage.classList.add('d-none');

    let canvas = document.getElementById('canvas');
    canvas.classList.add('d-block');

    let mobileButtons = document.getElementById('mobile_buttons');
    mobileButtons.classList.remove('d-none-i');
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


function handleOrientationChange() {
    const rotateDiv = document.getElementById('rotate');
    let startPage = document.getElementById('start_screen');
    let tutorialPage = document.getElementById('tutorial_container');
    let keyControlls = document.getElementById('key_container');
    let game = document.getElementById('fullscreen');
    let loseContainer = document.getElementById('lose_container');
    let winContainer = document.getElementById('win_container');


    if (window.innerWidth > window.innerHeight) {
        // Landscape-Modus
        rotateDiv.classList.add('d-none'); // Versteckt den Container
        startPage.classList.remove('d-none-i');
        tutorialPage.classList.remove('d-none-i');
        keyControlls.classList.remove('overlay-container');
        game.classList.remove('d-none-i');
    } else {
        // Portrait-Modus
        rotateDiv.classList.remove('d-none'); // Zeigt den Container
        startPage.classList.add('d-none-i');
        tutorialPage.classList.add('d-none-i');
        keyControlls.classList.add('overlay-container');
        game.classList.add('d-none-i');
    }
}

// Event-Listener für Änderungen der Bildschirmorientierung
window.addEventListener('resize', handleOrientationChange);
window.addEventListener('orientationchange', handleOrientationChange);

// Beim Laden der Seite überprüfen
document.addEventListener('DOMContentLoaded', handleOrientationChange);