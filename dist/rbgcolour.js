class RGBColour {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    static getRandomColour() {
        var [r, g, b] = [0, 0, 0].map(() => Math.floor(Math.random() * 255));
        return new RGBColour(r, g, b);
    }
    toHexString() {
        var result = "#";
        result += this.r.toString(16).padStart(2, "0");
        result += this.g.toString(16).padStart(2, "0");
        result += this.b.toString(16).padStart(2, "0");
        return result;
    }
    round() {
        const [r, g, b] = [this.r, this.g, this.b].map(x => Math.round(x));
        return new RGBColour(r, g, b);
    }
    get_inverse() {
        const [r1, g1, b1] = [this.r, this.g, this.b].map(x => 255 - x);
        return new RGBColour(r1, g1, b1);
    }
    add(c) {
        var newRed = this.r + c.r;
        var newGreen = this.g + c.g;
        var newBlue = this.b + c.b;
        return new RGBColour(newRed, newGreen, newBlue);
    }
    sub(c) {
        return this.add(c.scale(-1));
    }
    multiply(c) {
        const newRed = this.r / 255 * c.r;
        const newGreen = this.g / 255 * c.g;
        const newBlue = this.b / 255 * c.b;
        return new RGBColour(newRed, newGreen, newBlue);
    }
    scale(s) {
        var newRed = this.r * s;
        var newGreen = this.g * s;
        var newBlue = this.b * s;
        return new RGBColour(newRed, newGreen, newBlue);
    }
}
