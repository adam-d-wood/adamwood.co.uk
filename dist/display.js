class Display {
    constructor(canvas, backgroundColour) {
        this.pixelsPerUnit = 200;
        this.canvas = canvas;
        this.backgroundColour = backgroundColour;
        this.canvas.style.backgroundColor = this.backgroundColour.toHexString();
        this.width = this.canvas.getBoundingClientRect().width;
        this.height = this.canvas.getBoundingClientRect().height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = canvas.getContext("2d");
        this.bottomLeft = [(-this.width / 2) / this.pixelsPerUnit, (-this.height / 2) / this.pixelsPerUnit];
        this.topRight = [(this.width / 2) / this.pixelsPerUnit, (this.height / 2) / this.pixelsPerUnit];
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    toScreenCoords(spaceCoord) {
        const Q = new Vector([0, 0, 5]);
        const N = new Vector([0, 0, -1]);
        const O = new Vector([0, 0, 0]);
        const D = spaceCoord.sub(O);
        const s = (Q.sub(O).dot(N)) / D.dot(N);
        const screenIntersect = O.add(D.scale(s));
        const x = screenIntersect.getEntry(0);
        const y = screenIntersect.getEntry(1);
        return new Vector([x, y]);
    }
    drawLine2D(start, end, colour, width) {
        this.ctx.strokeStyle = colour.toHexString();
        this.ctx.lineWidth = width;
        const displayStart = this.toDisplayCoords(start.getEntry(0), start.getEntry(1));
        const displayEnd = this.toDisplayCoords(end.getEntry(0), end.getEntry(1));
        this.ctx.beginPath();
        this.ctx.moveTo(...displayStart);
        this.ctx.lineTo(...displayEnd);
        this.ctx.stroke();
    }
    drawLine(start, end, colour, width) {
        if (start.size == 2 && end.size == 2) {
            this.drawLine2D(start, end, colour, width);
        }
        else if (start.size == 3 && end.size == 3) {
            const [start2D, end2D] = [start, end].map(this.toScreenCoords);
            this.drawLine2D(start2D, end2D, colour, width);
        }
    }
    animateLine(start, end, colour, width, duration) {
        const freq = 20;
        const lineNum = duration / freq;
        const segment = end.sub(start).scale(1 / lineNum);
        // for (let i=0; i<lineNum; i++) {
        //     this.drawLine(start, start.add(segment.scale(i+1)), colour, width);
        // }
        let anim = setInterval(frame, 20);
        const self = this;
        let i = 0;
        function frame() {
            if (i > lineNum) {
                clearInterval(anim);
            }
            else {
                self.clear();
                self.drawGrid();
                self.drawLine(start, start.add(segment.scale(i + 1)), colour, width);
                i += 1;
            }
        }
    }
    pixelPlot(table) {
        let imageData = this.ctx.getImageData(0, 0, this.width, this.height);
        let imageArray = imageData.data;
        for (let coord of table) {
            let displayCoord = this.toDisplayCoords(coord[0], coord[1]);
            // console.log("plotting", displayCoord);
            let index = this.coordToIndex(displayCoord);
            const colour = new RGBColour(255, 0, 0);
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
        for (let i = 0; i < this.topRight[0]; i++) {
            this.drawLine2D(new Vector([i, this.topRight[1]]), new Vector([i, this.bottomLeft[1]]), new RGBColour(100, 100, 100), 2);
            this.drawLine2D(new Vector([-i, this.topRight[1]]), new Vector([-i, this.bottomLeft[1]]), new RGBColour(100, 100, 100), 2);
            this.drawLine2D(new Vector([this.bottomLeft[0], i]), new Vector([this.topRight[0], i]), new RGBColour(100, 100, 100), 2);
            this.drawLine2D(new Vector([this.bottomLeft[0], -i]), new Vector([this.topRight[0], -i]), new RGBColour(100, 100, 100), 2);
        }
    }
    drawFloor(duration) {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, "#aaaaaa01");
        gradient.addColorStop(0.5, "#fd11f4ff");
        gradient.addColorStop(1, "#aaaaaa01");
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = 2;
        const startPoints = [];
        const endPoints = [];
        const length = 100;
        for (let i = -10; i = 10; i++) {
            const startPoint = new Vector([i, -10, 0]);
            startPoints.push(startPoint);
            const endPoint = new Vector([i, -10, length]);
            endPoints.push(endPoint);
        }
        const freq = 20;
        const lineNum = duration / freq;
        let anim = setInterval(frame, 20);
        const self = this;
        let i = 0;
        function frame() {
            if (i > lineNum) {
                clearInterval(anim);
            }
            else {
                self.clear();
                // self.drawGrid();
                for (let j = 0; j < startPoints.length; j++) {
                    let start = startPoints[j];
                    let end = endPoints[j];
                    let animEnd = end.sub(start).scale((i + 1) / lineNum);
                    self.drawLine(start, animEnd, new RGBColour(255, 0, 0), 3);
                }
                i += 1;
            }
        }
    }
    lineJoinedPlot(table, curveColour) {
        this.ctx.strokeStyle = curveColour.toHexString();
        this.ctx.lineWidth = 3;
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
        // const newX: number = this.round((x - this.bottomLeft[0]) / this.getXUnitsPerPixel());
        const midX = this.width / 2;
        const newX = this.round(midX + x * this.pixelsPerUnit);
        const midY = this.height / 2;
        // const inverseY: number = (y - this.bottomLeft[1]) / this.getYUnitsPerPixel();
        // const newY: number = this.round(this.height - inverseY);
        const newY = this.round(midY - y * this.pixelsPerUnit);
        return [newX, newY];
    }
    getXUnitsPerPixel() {
        const span = this.topRight[0] - this.bottomLeft[0];
        // return span / 100;
        return span / this.width;
    }
    getYUnitsPerPixel() {
        const span = this.topRight[1] - this.bottomLeft[1];
        // return span / 1000;
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
