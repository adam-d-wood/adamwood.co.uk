class Display {

    private canvas: any;
    private ctx: any;
    public width: number;
    public height: number;
    public topLeft: number[];
    public bottomRight: number[];

    constructor(canvas: any) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }
}