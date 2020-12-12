var canvas = document.getElementById("display");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
var color = 0;
var n = 40;
for (var i =0; i<n; i++) {
    ctx.fillStyle = "#" + color.toString(16);
    console.log(ctx.fillStyle)
    ctx.fillRect(i*(200/n), 0, 2, 200);
    color += 1
}
// ctx.fillRect(10, 10, 150, 100);

