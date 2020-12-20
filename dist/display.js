class Display {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.bottomLeft = [-5, -5];
        this.topRight = [5, 5];
    }
    plot(table) {
        let imageData = this.ctx.getImageData();
        let imageArray = imageData.data;
        for (let coord of table) {
            let displayCoord = this.toDisplayCoords(coord[0], coord[1]);
            let index = this.coordToIndex(displayCoord);
            const colour = new Colour(0, 0, 0);
            imageArray[index] = colour.r;
            imageArray[index + 1] = colour.g;
            imageArray[index + 2] = colour.b;
            imageArray[index + 3] = 1;
        }
        this.ctx.putImageData(imageData, 0, 0);
    }
    coordToIndex(coord) {
        const [x, y] = coord;
        return x * 4 + y * this.width * 4;
    }
    toDisplayCoords(x, y) {
        const newX = (x - this.bottomLeft[0]) / this.getXUnitsPerPixel();
        const inverseY = (y - this.bottomLeft[1]) / this.getYUnitsPerPixel();
        const newY = this.height - inverseY;
        return [newX, newY];
    }
    getXUnitsPerPixel() {
        const span = this.topRight[0] - this.bottomLeft[0];
        return span / this.width;
    }
    getYUnitsPerPixel() {
        const span = this.topRight[1] - this.bottomLeft[1];
        return span / this.height;
    }
}
