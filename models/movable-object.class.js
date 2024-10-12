class MovableObject {
    x = 120;
    y = 150;
    img;
    height = 325;
    width = 300;

    loadImage(path) {
        this.img  = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {

    }
}