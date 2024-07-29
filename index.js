console.log("Hi World");

var canvas = document.getElementById("canvas");

// ctx iki boyutlu çizim yapmamıza olanak tanıyan bir nesne döner.
var c = canvas.getContext("2d");

// sayfanın görünen genişliğini verir
var tx = window.innerWidth;
// sayfanın görünen yüksekliğini verir
var ty = window.innerHeight;

//dinamik olarak pencerenin ölçüsünü canvasa verir.
canvas.width = tx;
canvas.height = ty;

var mousex = 0;
var mousey = 0;

addEventListener("mousemove", function () {
  mousex = event.clientX;
  mousey = event.clientY;
});

