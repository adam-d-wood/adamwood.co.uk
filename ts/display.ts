class Display {

    private canvas: any;
    private ctx: any;
    public width: number;
    public height: number;
    public bottomLeft: number[];
    public topRight: number[];

    constructor(canvas: any) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.bottomLeft = [-5, -5];
        this.topRight = [5, 5];
    }

    public plot(table: number[][]): void {
        let imageData: ImageData = this.ctx.getImageData(0, 0, this.width, this.height);
        let imageArray: Uint8ClampedArray = imageData.data;
        for (let coord of table) {
            let displayCoord: number[] = this.toDisplayCoords(coord[0], coord[1]);
            let index = this.coordToIndex(displayCoord);
            const colour = new Colour(0, 0, 0)
            imageArray[index] = colour.r;
            imageArray[index+1] = colour.g;
            imageArray[index+2] = colour.b;
            imageArray[index+3] = 1;
        }
        this.ctx.putImageData(imageData, 0, 0);

    }

    private coordToIndex(coord: number[]): number {
        const [x, y]: number[] = coord;
        return x * 4 + y * this.width * 4;
    }

    public toDisplayCoords(x: number, y: number): number[] {
        const newX: number = (x - this.bottomLeft[0]) / this.getXUnitsPerPixel();
        const inverseY: number = (y - this.bottomLeft[1]) / this.getYUnitsPerPixel();
        const newY: number = this.height - inverseY;
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
}