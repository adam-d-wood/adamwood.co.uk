class Colour {

    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    toHexString() {
        var result = "#";
        result += this.r.toString(16).padStart(2, "0");
        result += this.g.toString(16).padStart(2, "0");
        result += this.b.toString(16).padStart(2, "0");
        return result;
    }

    add(c) {
        var newRed = this.r + c.r;
        var newGreen = this.g + c.g;
        var newBlue = this.b + c.b;
        return new Colour(newRed, newGreen, newBlue);
    }
}