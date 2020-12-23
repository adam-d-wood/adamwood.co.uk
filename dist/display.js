class Display {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ctx = canvas.getContext("2d");
        this.bottomLeft = [-5, -5];
        this.topRight = [5, 5];
    }
    pixelPlot(table) {
        let imageData = this.ctx.getImageData(0, 0, this.width, this.height);
        let imageArray = imageData.data;
        for (let coord of table) {
            let displayCoord = this.toDisplayCoords(coord[0], coord[1]);
            let index = this.coordToIndex(displayCoord);
            const colour = new Colour(255, 0, 0);
            imageArray[index] = colour.r;
            imageArray[index + 1] = colour.g;
            imageArray[index + 2] = colour.b;
            imageArray[index + 3] = 255;
        }
        this.ctx.putImageData(imageData, 0, 0);
    }
    lineJoinedPlot(table) {
        const curveColour = new Colour(255, 0, 0);
        this.ctx.strokeStyle = curveColour.toHexString();
        ;
        this.ctx.lineWidth = 10;
        console.log("strokestyle", this.ctx.strokeStyle);
        this.ctx.beginPath();
        // this.ctx.moveTo(0, 0);
        for (let coord of table) {
            let displayCoord = this.toDisplayCoords(coord[0], coord[1]);
            this.ctx.lineTo(displayCoord[0], displayCoord[1]);
        }
        this.ctx.stroke();
    }
    coordToIndex(coord) {
        const [x, y] = coord;
        return x * 4 + y * this.width * 4;
    }
    toDisplayCoords(x, y) {
        const newX = this.round((x - this.bottomLeft[0]) / this.getXUnitsPerPixel());
        const inverseY = (y - this.bottomLeft[1]) / this.getYUnitsPerPixel();
        const newY = this.round(this.height - inverseY);
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
    round(n) {
        if (n % 1 < 0.5) {
            return Math.floor(n);
        }
        else {
            return Math.ceil(n);
        }
    }
}
