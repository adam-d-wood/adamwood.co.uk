class Display {
    constructor(canvas, backgroundColour) {
        this.canvas = canvas;
        this.backgroundColour = backgroundColour;
        this.canvas.style.backgroundColor = this.backgroundColour.toHexString();
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ctx = canvas.getContext("2d");
        this.bottomLeft = [-16, -9];
        this.topRight = [16, 9];
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
                    self.drawLine(start, animEnd, new Colour(255, 0, 0), 3);
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
