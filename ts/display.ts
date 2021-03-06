class Display {

    private canvas: any;
    private ctx: any;
    public width: number;
    public height: number;
    public bottomLeft: number[];
    public topRight: number[];
    public backgroundColour: Colour;

    constructor(canvas: any, backgroundColour: Colour) {
        this.canvas = canvas;
        this.backgroundColour = backgroundColour
        this.canvas.style.backgroundColor = this.backgroundColour.toHexString();
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ctx = canvas.getContext("2d");
        this.bottomLeft = [-16, -9];
        this.topRight = [16, 9];
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

    public drawLine2D(start: Vector, end: Vector, colour: Colour, width: number): void {
        this.ctx.strokeStyle = colour.toHexString();
        this.ctx.lineWidth = width;
        const displayStart: number[] = this.toDisplayCoords(start.getEntry(0), start.getEntry(1));
        const displayEnd: number[] = this.toDisplayCoords(end.getEntry(0), end.getEntry(1));
        this.ctx.beginPath();
        this.ctx.moveTo(...displayStart);
        this.ctx.lineTo(...displayEnd);
        this.ctx.stroke();
    }

    public drawLine(start: Vector, end: Vector, colour: Colour, width: number): void {
        if (start.size == 2 && end.size == 2) {
            this.drawLine2D(start, end, colour, width);
        } else if (start.size == 3 && end.size == 3) {
            const [start2D, end2D]: Vector[] = [start, end].map(this.toScreenCoords)
            this.drawLine2D(start2D, end2D, colour, width);
        }
    }

    public animateLine(start: Vector, end: Vector, colour: Colour, width: number, duration: number) {
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
            const colour = new Colour(255, 0, 0)
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
        for (let i=this.bottomLeft[0]; i<this.topRight[0]; i++) {
            this.ctx.beginPath();
            let top: number[] = this.toDisplayCoords(i, this.topRight[1]);
            this.ctx.moveTo(top[0], top[1]);
            let bottom: number[] = this.toDisplayCoords(i, this.bottomLeft[1]);
            this.ctx.lineTo(bottom[0], bottom[1]);
            this.ctx.stroke();
        }
        for (let i=this.bottomLeft[1]; i<this.topRight[1]; i++) {
            this.ctx.beginPath();
            let left: number[] = this.toDisplayCoords(this.bottomLeft[0], i);
            this.ctx.moveTo(left[0], left[1]);
            let right: number[] = this.toDisplayCoords(this.topRight[0], i);
            this.ctx.lineTo(right[0], right[1]);
            this.ctx.stroke();
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
                    self.drawLine(start, animEnd, new Colour(255, 0, 0), 3);
                }
                i += 1;
            }
        }
    }

    public lineJoinedPlot(table: number[][], curveColour: Colour): void {
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
        const newX: number = this.round((x - this.bottomLeft[0]) / this.getXUnitsPerPixel());
        const inverseY: number = (y - this.bottomLeft[1]) / this.getYUnitsPerPixel();
        const newY: number = this.round(this.height - inverseY);
        return [newX, newY];
    }

    public getXUnitsPerPixel(): number {
        const span: number = this.topRight[0] - this.bottomLeft[0];
        return span / this.width;
    }

    public getYUnitsPerPixel(): number {
        const span: number = this.topRight[1] - this.bottomLeft[1];
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