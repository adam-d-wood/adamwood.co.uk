class Colour {
  public r: number;
  public g: number;
  public b: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  static getRandomColour(): Colour {
      var [r, g, b] = [0, 0, 0].map(() => Math.floor(Math.random() * 255));
      return new Colour(r, g, b);
  }

  toHexString(): string {
    var result = "#";
    result += this.r.toString(16).padStart(2, "0");
    result += this.g.toString(16).padStart(2, "0");
    result += this.b.toString(16).padStart(2, "0");
    return result;
  }

  add(c: Colour): Colour {
    var newRed = this.r + c.r;
    var newGreen = this.g + c.g;
    var newBlue = this.b + c.b;
    return new Colour(newRed, newGreen, newBlue);
  }

  sub(c: Colour): Colour {
    return this.add(c.scale(-1));
  }

  scale(s: number): Colour {
      var newRed = this.r * s;
      var newGreen = this.g * s;
      var newBlue = this.b * s;
      return new Colour(newRed, newGreen, newBlue);
  }
}
