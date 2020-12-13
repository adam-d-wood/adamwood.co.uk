var canvas = document.getElementById("display");
var ctx = canvas.getContext("2d");
// ctx.fillStyle = "green";
var color = new Colour(0, 0, 0);
var n = 40;
for (var i =0; i<n; i++) {
    ctx.fillStyle = color.toHexString();
    console.log(ctx.fillStyle)
    ctx.fillRect(i*(200/n), 0, 2, 200);
    color = color.add(new Colour(5, 0, 0));
}
// ctx.fillRect(10, 10, 150, 100);

