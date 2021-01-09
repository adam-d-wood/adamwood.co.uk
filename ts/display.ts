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
        this.bottomLeft = [-5, -5];
        this.topRight = [5, 5];
    }

    public clear(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public pixelPlot(table: number[][]): void {
        let imageData: ImageData = this.ctx.getImageData(0, 0, this.width, this.height);
        let imageArray: Uint8ClampedArray = imageData.data;
        for (let coord of table) {
            let displayCoord: number[] = this.toDisplayCoords(coord[0], coord[1]);
            console.log("plotting", displayCoord);
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

    public lineJoinedPlot(table: number[][], curveColour: Colour): void {
        this.ctx.strokeStyle = curveColour.toHexString() + "c0";
        this.ctx.lineWidth = 10;
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