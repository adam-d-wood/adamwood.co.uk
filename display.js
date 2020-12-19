var Display = /** @class */ (function () {
    function Display(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.bottomLeft = [-5, -5];
        this.topRight = [5, 5];
    }
    Display.prototype.plot = function (table) {
        var imageData = this.ctx.getImageData();
        var imageArray = imageData.data;
        for (var _i = 0, table_1 = table; _i < table_1.length; _i++) {
            var coord = table_1[_i];
            var displayCoord = this.toDisplayCoords(coord[0], coord[1]);
            var index = this.coordToIndex(displayCoord);
            var colour = new Colour(0, 0, 0);
            imageArray[index] = colour.r;
            imageArray[index + 1] = colour.g;
            imageArray[index + 2] = colour.b;
            imageArray[index + 3] = 1;
        }
        this.ctx.putImageData(imageData, 0, 0);
    };
    Display.prototype.coordToIndex = function (coord) {
        var x = coord[0], y = coord[1];
        return x * 4 + y * this.width * 4;
    };
    Display.prototype.toDisplayCoords = function (x, y) {
        var newX = (x - this.bottomLeft[0]) / this.getXUnitsPerPixel();
        var inverseY = (y - this.bottomLeft[1]) / this.getYUnitsPerPixel();
        var newY = this.height - inverseY;
        return [newX, newY];
    };
    Display.prototype.getXUnitsPerPixel = function () {
        var span = this.topRight[0] - this.bottomLeft[0];
        return span / this.width;
    };
    Display.prototype.getYUnitsPerPixel = function () {
        var span = this.topRight[1] - this.bottomLeft[1];
        return span / this.height;
    };
    return Display;
}());
