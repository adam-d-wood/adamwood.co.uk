class Display {

    private pixelsPerUnit: number = 200;

    private canvas: any;
    private ctx: any;
    public width: number;
    public height: number;
    public bottomLeft: number[];
    public topRight: number[];
    public backgroundColour: RGBColour;

    constructor(canvas: any, backgroundColour: RGBColour) {
        this.canvas = canvas;
        this.backgroundColour = backgroundColour
        this.canvas.style.backgroundColor = this.backgroundColour.toHexString();
        this.width = this.canvas.getBoundingClientRect().width;
        this.height = this.canvas.getBoundingClientRect().height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = canvas.getContext("2d");
        this.bottomLeft = [(-this.width/2)/this.pixelsPerUnit, (-this.height/2)/this.pixelsPerUnit];
        this.topRight = [(this.width/2)/this.pixelsPerUnit, (this.height/2)/this.pixelsPerUnit];
    }

    public clear(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    toScreenCoords(spaceCoord: Vector): Vector {
        const Q: Vector = new Vector([0, 0, 5]);
        const N: Vector = new Vector([0, 0, -1]);
        const O: Vector = new Vector([0, 0, 0]);
        const D: Vector = spaceCoord.sub(O);
        const s: number = (Q.sub(O).dot(N)) / D.dot(N);
        const screenIntersect: Vector = O.add(D.scale(s));
        const x = screenIntersect.getEntry(0);
        const y = screenIntersect.getEntry(1);
        return new Vector([x, y]);
    }

    public drawLine2D(start: Vector, end: Vector, colour: RGBColour, width: number): void {
        this.ctx.strokeStyle = colour.toHexString();
        this.ctx.lineWidth = width;
        const displayStart: number[] = this.toDisplayCoords(start.getEntry(0), start.getEntry(1));
        const displayEnd: number[] = this.toDisplayCoords(end.getEntry(0), end.getEntry(1));
        this.ctx.beginPath();
        this.ctx.moveTo(...displayStart);
        this.ctx.lineTo(...displayEnd);
        this.ctx.stroke();
    }

    public drawLine(start: Vector, end: Vector, colour: RGBColour, width: number): void {
        if (start.size == 2 && end.size == 2) {
            this.drawLine2D(start, end, colour, width);
        } else if (start.size == 3 && end.size == 3) {
            const [start2D, end2D]: Vector[] = [start, end].map(this.toScreenCoords)
            this.drawLine2D(start2D, end2D, colour, width);
        }
    }

    public animateLine(start: Vector, end: Vector, colour: RGBColour, width: number, duration: number) {
        const freq: number = 20;
        const lineNum: number = duration / freq;
        const segment: Vector = end.sub(start).scale(1/lineNum);
        // for (let i=0; i<lineNum; i++) {
        //     this.drawLine(start, start.add(segment.scale(i+1)), colour, width);
        // }
        let anim = setInterval(frame, 20);
        const self: Display = this;
        let i: number = 0;
        function frame(): void {
            if (i > lineNum) {
                clearInterval(anim);
            } else {
                self.clear();
                self.drawGrid();
                self.drawLine(start, start.add(segment.scale(i+1)), colour, width);
                i += 1;
            }
        }
    }

    public pixelPlot(table: number[][]): void {
        let imageData: ImageData = this.ctx.getImageData(0, 0, this.width, this.height);
        let imageArray: Uint8ClampedArray = imageData.data;
        for (let coord of table) {
            let displayCoord: number[] = this.toDisplayCoords(coord[0], coord[1]);
            // console.log("plotting", displayCoord);
            let index: number = this.coordToIndex(displayCoord);
            const colour = new RGBColour(255, 0, 0)
            imageArray[index] = colour.r;
            imageArray[index+1] = colour.g;
            imageArray[index+2] = colour.b;
            imageArray[index+3] = 255;
        }
        this.ctx.putImageData(imageData, 0, 0);
    }

    public drawGrid(): void {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, "#aaaaaa01");
        gradient.addColorStop(0.5, "#fd11f4ff");
        gradient.addColorStop(1, "#aaaaaa01");
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = 2;

        for (let i=0; i<this.topRight[0]; i++) {
            this.drawLine2D(new Vector([i, this.topRight[1]]), new Vector([i, this.bottomLeft[1]]), new RGBColour(100, 100, 100), 2);
            this.drawLine2D(new Vector([-i, this.topRight[1]]), new Vector([-i, this.bottomLeft[1]]), new RGBColour(100, 100, 100), 2);
            this.drawLine2D(new Vector([this.bottomLeft[0], i]), new Vector([this.topRight[0], i]), new RGBColour(100, 100, 100), 2);
            this.drawLine2D(new Vector([this.bottomLeft[0], -i]), new Vector([this.topRight[0], -i]), new RGBColour(100, 100, 100), 2);
        }
    }

    drawFloor(duration: number): void {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, "#aaaaaa01");
        gradient.addColorStop(0.5, "#fd11f4ff");
        gradient.addColorStop(1, "#aaaaaa01");
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = 2;
        const startPoints: Vector[] = [];
        const endPoints: Vector[] = [];
        const length: number = 100;
        for (let i = -10; i =10; i++) {
            const startPoint: Vector = new Vector([i, -10, 0]);
            startPoints.push(startPoint);
            const endPoint: Vector = new Vector([i, -10, length]);
            endPoints.push(endPoint);
        } 
        const freq: number = 20;
        const lineNum: number = duration / freq;
        let anim = setInterval(frame, 20);
        const self: Display = this;
        let i: number = 0;
        function frame(): void {
            if (i > lineNum) {
                clearInterval(anim);
            } else {
                self.clear();
                // self.drawGrid();
                for (let j=0; j<startPoints.length; j++) {
                    let start: Vector = startPoints[j];
                    let end: Vector = endPoints[j]
                    let animEnd: Vector = end.sub(start).scale((i+1)/lineNum);
                    self.drawLine(start, animEnd, new RGBColour(255, 0, 0), 3);
                }
                i += 1;
            }
        }
    }

    public lineJoinedPlot(table: number[][], curveColour: RGBColour): void {
        this.ctx.strokeStyle = curveColour.toHexString();
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        // this.ctx.moveTo(0, 0);
        for (let coord of table) {
            let displayCoord: number[] = this.toDisplayCoords(coord[0], coord[1]);
            this.ctx.lineTo(displayCoord[0], displayCoord[1]);
        }
        this.ctx.stroke();
    }

    private coordToIndex(coord: number[]): number {
        const [x, y]: number[] = coord;
        return x * 4 + y * this.width * 4;
    }

    public toDisplayCoords(x: number, y: number): number[] {
        // const newX: number = this.round((x - this.bottomLeft[0]) / this.getXUnitsPerPixel());
        const midX: number = this.width / 2;
        const newX: number = this.round(midX + x * this.pixelsPerUnit);
        const midY: number = this.height / 2;
        // const inverseY: number = (y - this.bottomLeft[1]) / this.getYUnitsPerPixel();
        // const newY: number = this.round(this.height - inverseY);
        const newY: number = this.round(midY - y * this.pixelsPerUnit);
        return [newX, newY];
    }

    public getXUnitsPerPixel(): number {
        const span: number = this.topRight[0] - this.bottomLeft[0];
        // return span / 100;
        return span / this.width;
    }

    public getYUnitsPerPixel(): number {
        const span: number = this.topRight[1] - this.bottomLeft[1];
        // return span / 1000;
        return span / this.height;
    }

    private round(n: number): number {
        if (n % 1 < 0.5) {
            return Math.floor(n);
        } else {
            return Math.ceil(n);
        }
    }
}