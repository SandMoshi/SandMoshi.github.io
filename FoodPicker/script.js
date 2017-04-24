//Make sure json file is loaded
if(typeof foods !== 'object'){
	alert("Oops, the app did not load properly");
}
else{
	console.log(foods);
}
var button = document.querySelector('button.go');
	console.log(button);

//----------
function updateApp(item){
	var placeholder = document.querySelector("h2.food");
	if(placeholder.classList.contains("visible")){
		placeholder.classList.remove("visible");
	}
	
	
	setTimeout(function(){
		placeholder.innerHTML = item;
		placeholder.classList.add("visible")},300
	);
}


//----------
function getFood(){
	
	//find out what the person selected
	var fresh = document.querySelector('input.fresh').checked;
		console.log("fresh:" + fresh);
	var temp = document.querySelector('input.temp').checked;
		if(temp === true){
			temp = "hot";
		}
		else { temp = "cold";}
		console.log("temp:" + temp);
	
	
	//filter your foods list based on their selections
	var filtered = foods.filter(function(food){
		console.log(fresh);
		if(food.isfresh === fresh && food.temp === temp){
			return true;
		}
	});
	console.log(filtered);
	
	var chosen = filtered[Math.floor(Math.random()*filtered.length)];
	console.log("A food was chosen...");
	console.log(chosen);
	
	updateApp(chosen.food); // this function will update DOM
	
}; //end of function


button.onclick = function(){
	getFood();
};