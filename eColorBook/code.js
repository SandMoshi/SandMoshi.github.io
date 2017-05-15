const canvas = document.querySelector("canvas#draw");

const ctx = canvas.getContext('2d');

//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

ctx.strokeStyle = "black";
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 12;

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function drawline(e){
//	console.log(isDrawing);
	if(!isDrawing){
		return; //do nothing if not drawing
	}
	ctx.beginPath();
	ctx.moveTo(lastX,lastY);
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();
	lastX = e.offsetX;
	lastY = e.offsetY;
}
//Listen for mouse actions over canvas
canvas.addEventListener('mousemove', drawline);
canvas.addEventListener('mousedown', function(e){
	//	console.log(e);
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
		ctx.drawImage(base, 0 , 0);
	}
}