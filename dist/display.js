class Display {
    constructor(canvas, backgroundColour) {
        this.canvas = canvas;
        this.backgroundColour = backgroundColour;
        this.canvas.style.backgroundColor = this.backgroundColour.toHexString();
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ctx = canvas.getContext("2d");
        this.bottomLeft = [-5, -5];
        this.topRight = [5, 5];
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    pixelPlot(table) {
        let imageData = this.ctx.getImageData(0, 0, this.width, this.height);
        let imageArray = imageData.data;
        for (let coord of table) {
            let displayCoord = this.toDisplayCoords(coord[0], coord[1]);
            console.log("plotting", displayCoord);
            let index = this.coordToIndex(displayCoord);
            const colour = new Colour(255, 0, 0);
            imageArray[index] = colour.r;
            imageArray[index + 1] = colour.g;
            imageArray[index + 2] = colour.b;
            imageArray[index + 3] = 255;
        }
        this.ctx.putImageData(imageData, 0, 0);
    }
    drawGrid() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, "#aaaaaa01");
        gradient.addColorStop(0.5, "#fd11f4ff");
        gradient.addColorStop(1, "#aaaaaa01");
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = 2;
        for (let i = this.bottomLeft[0]; i < this.topRight[0]; i++) {
            this.ctx.beginPath();
            let top = this.toDisplayCoords(i, this.topRight[1]);
            this.ctx.moveTo(top[0], top[1]);
            let bottom = this.toDisplayCoords(i, this.bottomLeft[1]);
            this.ctx.lineTo(bottom[0], bottom[1]);
            this.ctx.stroke();
        }
        for (let i = this.bottomLeft[1]; i < this.topRight[1]; i++) {
            this.ctx.beginPath();
            let left = this.toDisplayCoords(this.bottomLeft[0], i);
            this.ctx.moveTo(left[0], left[1]);
            let right = this.toDisplayCoords(this.topRight[0], i);
            this.ctx.lineTo(right[0], right[1]);
            this.ctx.stroke();
        }
    }
    lineJoinedPlot(table, curveColour) {
        this.ctx.strokeStyle = curveColour.toHexString() + "c0";
        this.ctx.lineWidth = 10;
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
