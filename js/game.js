/**
 * Main application variables and functions for game initialization, controls, and sound management.
 * This script manages game states, interactions, and audio settings.
 */

// Canvas and world variables
let canvas;
let world;

// Keyboard input
let keyboard = new Keyboard();

// Sound management
let soundsMuted = false;
let sounds = {
    swim_sound: new Audio('audio/swim.mp3'),
    snoring_sound: new Audio('audio/snoring.mp3'),
    hurt: new Audio('audio/hurt.mp3'),
    bubbleshot_sound: new Audio('audio/bubble_shot.mp3'),
    slap_sound: new Audio('audio/slap_sound.mp3'),
    background_music: new Audio('audio/background_music.mp3'),
    win: new Audio('audio/win.mp3'),
    lose: new Audio('audio/lose.mp3'),
    endboss_fight: new Audio('audio/endboss_fight.mp3'),
    coin: new Audio('audio/coin.mp3'),
    bottle: new Audio('audio/bottle.mp3'),
};

// Adjust volume levels for specific sounds
sounds.swim_sound.volume = 0.05;
sounds.win.volume = 0.2;
sounds.endboss_fight.volume = 0.3;

/**
 * Initialize the game by hiding the start screen, showing the tutorial page, and starting the level.
 */
function init() {
    let startPage = document.getElementById('start_screen');
    startPage.classList.add('d-none');

    let game = document.getElementById('fullscreen');
    game.classList.remove('d-none');

    canvas = document.getElementById('canvas');
    canvas.classList.add('d-block');

    startLevel();
    world = new World(canvas, keyboard);
}

/**
 * Display the controls tutorial and hide the game canvas.
 */
function showKeyControlls() {
    let tutorialPage = document.getElementById('tutorial_container');
    tutorialPage.classList.remove('d-none');

    let canvas = document.getElementById('canvas');
    canvas.classList.remove('d-block');

    let mobileButtons = document.getElementById('mobile_buttons');
    mobileButtons.classList.add('d-none-i');

    let hud = document.getElementById('hud');
    hud.classList.add('d-none-i');
}

/**
 * Close the controls tutorial and display the game canvas.
 */
function closeKeyControlls() {
    let tutorialPage = document.getElementById('tutorial_container');
    tutorialPage.classList.add('d-none');

    let canvas = document.getElementById('canvas');
    canvas.classList.add('d-block');

    let mobileButtons = document.getElementById('mobile_buttons');
    mobileButtons.classList.remove('d-none-i');

    let hud = document.getElementById('hud');
    hud.classList.remove('d-none-i');
}

/**
 * Restart the game by resetting states and reinitializing the game.
 */
function restartGame() {
    let overlayLose = document.getElementById('lose_container');
    let hud = document.getElementById('hud');

    overlayLose.classList.remove('overlay-container');
    overlayLose.classList.add('d-none');
    hud.classList.remove('d-none-i');
    pauseSound('lose');
    pauseSound('background_music');
    init();
}

/**
 * Restart the game after winning by resetting states and reinitializing the game.
 */
function playAgain() {
    let overlayWin = document.getElementById('win_container');
    let hud = document.getElementById('hud');

    overlayWin.classList.remove('overlay-container');
    overlayWin.classList.add('d-none');
    hud.classList.remove('d-none-i');
    pauseSound('win');
    pauseSound('background_music');
    init();
}

/**
 * Check if the player has won the game by defeating the end boss.
 */
function checkWin() {
    setTimeout(() => {
        if (this.checkEndbossDead() && this.character.gameOver == false) {
            let overlayWin = document.getElementById('win_container');
            let canvas = document.getElementById('canvas');
            let mobileButtons = document.getElementById('mobile_buttons');
            let hud = document.getElementById('hud');
    
            mobileButtons.classList.add('d-none-i');
            canvas.classList.remove('d-block');
            overlayWin.classList.add('overlay-container');
            overlayWin.classList.remove('d-none');
            hud.classList.add('d-none-i');
            pauseSound('endboss_fight');
            playSound('win');
            this.clearAllIntervals();
        }
    }, 500);
}

/**
 * Toggle the game's music on or off.
 */
function toggleMusic() {
    let soundImg = document.getElementById('sound_img');
    if (soundsMuted) {
        soundImg.src = 'img/Buttons/mittleres-volumen.png';
        unmuteSounds();
    } else {
        soundImg.src = 'img/Buttons/volumen.png';
        muteSounds();
    }
    soundsMuted = !soundsMuted;
}

/**
 * Mute all game sounds.
 */
function muteSounds() {
    for (let soundName in sounds) {
        sounds[soundName].muted = true;
    }
}

/**
 * Unmute all game sounds.
 */
function unmuteSounds() {
    for (let soundName in sounds) {
        sounds[soundName].muted = false;
    }
}

/**
 * Play a specific game sound.
 * @param {string} sound - The key name of the sound to play.
 */
function playSound(sound) {
    if (sounds[sound]) {
        sounds[sound].play();
    }
}

/**
 * Pause a specific game sound.
 * @param {string} sound - The key name of the sound to pause.
 */
function pauseSound(sound) {
    if (sounds[sound]) {
        sounds[sound].pause();
    }
}

/**
 * Add touch controls for mobile gameplay.
 */
function mobilePlay() {
    const controls = [
        { id: 'btnUp', key: 'UP' },
        { id: 'btnDown', key: 'DOWN' },
        { id: 'btnLeft', key: 'LEFT' },
        { id: 'btnRight', key: 'RIGHT' },
        { id: 'btnBubble', key: 'ATTACK_BUBBLE' },
        { id: 'btnSlap', key: 'ATTACK_SLAP' },
    ];
    controls.forEach(control => {
        const element = document.getElementById(control.id);
        if (element) {
            element.addEventListener('touchstart', (event) => {
                event.preventDefault();
                keyboard[control.key] = true;
            });
            element.addEventListener('touchend', (event) => {
                event.preventDefault();
                keyboard[control.key] = false;
            });
        }
    });
}

/**
 * Handle changes in screen orientation for responsive design.
 */
function handleOrientationChange() {
    const rotateDiv = document.getElementById('rotate');
    let startPage = document.getElementById('start_screen');
    let tutorialPage = document.getElementById('tutorial_container');
    let game = document.getElementById('fullscreen');

    if (window.innerWidth > window.innerHeight) {
        // Landscape mode
        rotateDiv.classList.add('d-none');
        startPage.classList.remove('d-none-i');
        tutorialPage.classList.remove('d-none-i');
        game.classList.remove('d-none-i');
        mobilePlay();
    } else {
        // Portrait mode
        rotateDiv.classList.remove('d-none');
        startPage.classList.add('d-none-i');
        tutorialPage.classList.add('d-none-i');
        game.classList.add('d-none-i');
    }
}

// Event listeners for screen orientation changes
window.addEventListener('resize', handleOrientationChange);
window.addEventListener('orientationchange', handleOrientationChange);

// Check orientation when the page loads
document.addEventListener('DOMContentLoaded', handleOrientationChange);