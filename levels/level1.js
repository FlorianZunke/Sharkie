/**
 * Starts the first level of the game by initializing all the required objects such as enemies, background layers, items, and barriers.
 * It sets up the environment, enemy positions, and interactive elements for the game to be played.
 *
 * @function startLevel
 * @returns {void} This function does not return any value. It initializes the game environment.
 *
 * @example
 * startLevel();
 */
let level1;

/**
 * Initializes the first level of the game by creating a new `Level` object.
 * This level contains various enemies (PufferFish, JellyFish, Endboss), background objects, collectible items (Coins, Poison Bottles), and barriers.
 *
 * The `Level` object is constructed with arrays of the following:
 * 1. Enemies: Various enemy types, such as PufferFish, JellyFish, and an Endboss, each with specific x and y coordinates and other properties.
 * 2. Background objects: The background layers (water, floor, and light) are added in multiple copies to create a scrolling effect.
 * 3. Collectibles: Coins and Poison Bottles placed at specific locations within the level.
 * 4. Barriers: Obstacles (Barriars) that the player must navigate around or interact with in the level.
 */
function startLevel() {

    level1 = new Level(
        [
            new PufferFish(701, 120, 500, 1050),
            new JellyFish(1500, 200, 50, 300),
            new JellyFish(2115, 200, 50, 360),
            new PufferFish(2300, 20, 2000, 2600),
            new JellyFish(2950, 50, 20, 200),
            new JellyFish(3150, 200, 20, 250),
            new JellyFish(3350, 20, 20, 250),
            new JellyFish(3550, 200, 20, 350),
            new JellyFish(4070, 300, 20, 350),
            new PufferFish(4500, 20, 4400, 4800),
            new JellyFish(5080, 300, 20, 350),
            new PufferFish(5200, 20, 5000, 5900),
            new Endboss(50, 20, 150)
        ],
        [
            new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', -720),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', -720),
            new BackgroundObject('img/3. Background/Layers/1. Light/2.png', -720),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', -720),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', -720),

            new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 0),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 0),
            new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 0),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 0),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 0),

            new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 720),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 720),
            new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 720),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 720),

            new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 720 * 2),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 720 * 2),
            new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 720 * 2),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 720 * 2),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 720 * 2),

            new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 720 * 3),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 720 * 3),
            new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 720 * 3),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720 * 3),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 720 * 3),

            new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 720 * 4),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 720 * 4),
            new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 720 * 4),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 720 * 4),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 720 * 4),

            new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 720 * 5),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 720 * 5),
            new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 720 * 5),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720 * 5),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 720 * 5),

            new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 720 * 6),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 720 * 6),
            new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 720 * 6),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 720 * 6),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 720 * 6),

            new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 720 * 7),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 720 * 7),
            new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 720 * 7),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720 * 7),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 720 * 7),

            new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 720 * 8),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 720 * 8),
            new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 720 * 8),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 720 * 8),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 720 * 8),

            new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 720 * 9),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 720 * 9),
            new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 720 * 9),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720 * 9),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 720 * 9),
        ],
        [
            new Coin('img/4. Marcadores/1. Coins/3.png', 600, 150),
            new Coin('img/4. Marcadores/1. Coins/3.png', 1000, 150),
            new Coin('img/4. Marcadores/1. Coins/3.png', 2200, 30),
            new Coin('img/4. Marcadores/1. Coins/3.png', 3850, 350),
            new Coin('img/4. Marcadores/1. Coins/3.png', 5250, 40),
        ],
        [
            new PoisionBottle('img/4. Marcadores/Posión/Dark - Left.png', 1550, 20),
            new PoisionBottle('img/4. Marcadores/Posión/Dark - Left.png', 2550, 20),
            new PoisionBottle('img/4. Marcadores/Posión/Dark - Left.png', 3350, 120),
            new PoisionBottle('img/4. Marcadores/Posión/Dark - Left.png', 5150, 350),
            new PoisionBottle('img/4. Marcadores/Posión/Dark - Left.png', 5700, 110)
        ],
        [
            new Barriar('img/3. Background/Barrier/0.png', 400, 400, 100, 1050, 15, 0),
            new Barriar('img/3. Background/Barrier/1.png', 500, -60, 200, 950, 15, 0),
            new Barriar('img/3. Background/Barrier/3.png', 1750, -80, 375, 275, 15, -30),
            new Barriar('img/3. Background/Barrier/2.png', 2350, 265, 225, 800, 40, 0),
            new Barriar('img/3. Background/Barrier/3.png', 3700, -80, 375, 300, 15, -30),
            new Barriar('img/3. Background/Barrier/2.png', 4250, 265, 225, 800, 30, 0),
            new Barriar('img/3. Background/Barrier/3.png', 5320, 160, 345, 250, 15, 0),
        ]
    );
}