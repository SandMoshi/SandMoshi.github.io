//Make sure json file is loaded
if(typeof foods !== 'object'){
	alert("Oops, the app did not load properly");
}
else{
	console.log(foods);
}
var button = document.querySelector('button.go');
	console.log(button);
var seen = []; //empty array to keep track of seen foods

//----------
function clearSeen(){
	//empty the seen array
	seen = [];
	console.log("seen array cleared");
}
//---------
function hideText(placeholder){
	if(placeholder.classList.contains("visible")){
		placeholder.classList.remove("visible");
	}			 
}
function showText(placeholder,item){
		placeholder.innerHTML = item;
		placeholder.classList.add("visible");
}
//----------
function updateApp(item){
	var placeholder = document.querySelector("h2.food");
	hideText(placeholder);
	setTimeout(function(){
		showText(placeholder,item);
	},300);
}

//----------
function getFood(){
	
	//find out what the person selected
	var fresh = document.querySelector('input.fresh').checked;
		//console.log("fresh:" + fresh);
	var temp = document.querySelector('input.temp').checked;
		if(temp === true){
			temp = "hot";
		}
		else { temp = "cold";}
		//console.log("temp:" + temp);
	
	
	//filter your foods list based on their selections
	var filtered = foods.filter(function(food){
		//		console.log(fresh);
		if(food.isfresh === fresh && food.temp === temp){
			return true;
		}
	});
	console.log(filtered);
	
	var chosen = filtered[Math.floor(Math.random()*filtered.length)];
	console.log(chosen);
	//make sure that the food hasn't been shown
	if (!doubleCheck(chosen.food,filtered.length)){
			console.log("repicking..")
			getFood();
			return;
		}
	console.log("A food was chosen...");
	
	updateApp(chosen.food); // this function will update DOM
} //end of function

//----------
function doubleCheck(item,total){
	console.log(seen);
	if (seen.indexOf(item) === -1){
		seen.push(item); //new item so okay to show it
		return true;
	}
	else if (seen.length === total){
		var lastitem = seen[seen.length - 1];
		console.log(lastitem);
		clearSeen(); //empty the seen array and start over
		console.log("all the foods have been exhausted");
		if(lastitem === item){
			return false;
		}
		else{
			return true;
		}
	}
	else{ 
		return false; //this item has been shown, pick again
	}
};

button.onclick = function(){
	getFood();
};

