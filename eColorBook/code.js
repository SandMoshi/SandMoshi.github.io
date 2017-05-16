const canvas = document.querySelector("canvas#draw");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext('2d');

//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

ctx.strokeStyle = "grey";
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 12;

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Prevent scrolling when touching the canvas
document.body.addEventListener("touchstart", function (e) {
	console.log(e.target);
  if (e.target === canvas) {
		document.body.classList.add("locked"); //this prevents scrolling
		//		console.log("prevented scrolling");
  }
}, false);
document.body.addEventListener("touchend", function (e) {
  if (e.target === canvas) {
		document.body.classList.remove("locked"); //this allows scrolling
		//		console.log("prevented scrolling");
  }
}, false);

function drawline(e){
//	console.log(isDrawing);
	if(!isDrawing){
		return; //do nothing if not drawing
	}
	if(e.offsetX === undefined){
		var rect = e.target.getBoundingClientRect();
		//		console.log(e.targetTouches[0].pageX);
		ctx.beginPath();
		ctx.moveTo(lastX,lastY);
		lastX = e.targetTouches[0].pageX - rect.left;
		lastY = e.targetTouches[0].pageY - rect.top;
		ctx.lineTo(lastX,lastY);
		ctx.stroke();
		lastX = e.targetTouches[0].pageX - rect.left;
		lastY = e.targetTouches[0].pageY - rect.top;
	}
	else{
//		console.log(e);
		ctx.beginPath();
		ctx.moveTo(lastX,lastY);
		ctx.lineTo(e.offsetX, e.offsetY);
		ctx.stroke();
		lastX = e.offsetX;
		lastY = e.offsetY;
	}
}
//Listen for mouse actions over canvas
canvas.addEventListener('mousemove', drawline);
canvas.addEventListener('mousedown', function(e){
//		console.log(e);
	isDrawing = true
	lastX = e.offsetX;
	lastY = e.offsetY;
	drawline(e);
});
canvas.addEventListener('mouseup', function(){
	isDrawing = false;
	load_image();
});
canvas.addEventListener('mouseout', function(){isDrawing = false});
//Add the same event listeners but for touch devices now
canvas.addEventListener('touchmove',function(e){
	isDrawing = true
	var rect = e.target.getBoundingClientRect();
	lastX = e.targetTouches[0].pageX - rect.left;
	lastY = e.targetTouches[0].pageY - rect.top;
	drawline(e);
	});
canvas.addEventListener('touchstart', function(e){
	//	console.log(e);
	isDrawing = true
	var rect = e.target.getBoundingClientRect();
	lastX = e.targetTouches[0].pageX - rect.left;
	lastY = e.targetTouches[0].pageY - rect.top;
	drawline(e);
});
canvas.addEventListener('touchend', function(){
	isDrawing = false;
	load_image();
});

//Listen for color change
let colors = document.querySelectorAll("div.pallete div.color a");
let currentcolorbox = document.querySelector("div.currentColors div.color");
for (var i=0; i < colors.length; i++){ 
	{
		let item = colors[i];
		item.addEventListener('click', function(){
			let chosenColor = item.dataset.color;
			//alert(chosenColor);
			ctx.strokeStyle = chosenColor;
			currentcolorbox.style.backgroundColor = chosenColor
		})
	};
}

//Listen for brush size change
let brushSizeInput = document.querySelector("div.brushsize input");
let brushSizeText = document.querySelector("div.brushsize p");
brushSizeInput.addEventListener('input', function(){
	let brushsize = brushSizeInput.value;
	//	console.log(brushsize);
	brushSizeText.innerHTML = "Brush Size: " + brushsize;
	ctx.lineWidth = brushsize;
})

//Image Urls
let files = [
	"fox-trans.png",
	"cat-trans.png",
	"elk-trans.png",
	"flower-trans.png",
	"mandela-trans.png"
];
//Starting images
let fileindex = 0;
let filename = files[0];

//Listen for Image Change Button Clicks
const nextImage = document.querySelector("div.pagebuttons .next");
const lastImage = document.querySelector("div.pagebuttons .last");

nextImage.addEventListener('click', function(){
	change_file("+")});
lastImage.addEventListener('click', function(){
	change_file("-")});

//Change Image Function
function change_file(direction){
	if (direction === "+") {
		fileindex ++;
		if (fileindex >= files.length) { fileindex = 0 }
	}	
	if (direction === "-"){
		fileindex --;
		if (fileindex < 0) { fileindex = files.length - 1}
	}
	filename = files[fileindex];
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	load_image();
}

//Load image
load_image();
function load_image(){
	let base = new Image();
	base.src = 'pages/' + filename;
	base.onload = function(){
		ctx.drawImage(base, 0 , 0, canvas.width, canvas.height);
	}
}
