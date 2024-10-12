class PufferFish extends MovableObject{
    height = 100;
    width = 125;

    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png')

        this.x = 350 + Math.random() * 500;
    }

    
}