class Display {

    private canvas: any;
    private ctx: any;
    public width: number;
    public height: number;
    public bottomLeft: number[];
    public topRight: number[];

    constructor(canvas: any) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ctx = canvas.getContext("2d");
        this.bottomLeft = [-5, -5];
        this.topRight = [5, 5];
    }

    public pixelPlot(table: number[][]): void {
        let imageData: ImageData = this.ctx.getImageData(0, 0, this.width, this.height);
        let imageArray: Uint8ClampedArray = imageData.data;
        for (let coord of table) {
            let displayCoord: number[] = this.toDisplayCoords(coord[0], coord[1]);
            let index: number = this.coordToIndex(displayCoord);
            const colour = new Colour(255, 0, 0)
            imageArray[index] = colour.r;
            imageArray[index+1] = colour.g;
            imageArray[index+2] = colour.b;
            imageArray[index+3] = 255;
        }
        this.ctx.putImageData(imageData, 0, 0);

    }

    public lineJoinedPlot(table: number[][]): void {
        const curveColour: Colour = new Colour(255, 0, 0);
        this.ctx.strokeStyle = curveColour.toHexString();;
        this.ctx.lineWidth = 10;
        console.log("strokestyle", this.ctx.strokeStyle);
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