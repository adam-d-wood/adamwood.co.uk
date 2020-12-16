var Colour = /** @class */ (function () {
    function Colour(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    Colour.getRandomColour = function () {
        var _a = [0, 0, 0].map(function () { return Math.floor(Math.random() * 255); }), r = _a[0], g = _a[1], b = _a[2];
        return new Colour(r, g, b);
    };
    Colour.prototype.toHexString = function () {
        var result = "#";
        result += this.r.toString(16).padStart(2, "0");
        result += this.g.toString(16).padStart(2, "0");
        result += this.b.toString(16).padStart(2, "0");
        return result;
    };
    Colour.prototype.add = function (c) {
        var newRed = this.r + c.r;
        var newGreen = this.g + c.g;
        var newBlue = this.b + c.b;
        return new Colour(newRed, newGreen, newBlue);
    };
    Colour.prototype.sub = function (c) {
        return this.add(c.scale(-1));
    };
    Colour.prototype.scale = function (s) {
        var newRed = this.r * s;
        var newGreen = this.g * s;
        var newBlue = this.b * s;
        return new Colour(newRed, newGreen, newBlue);
    };
    return Colour;
}());
