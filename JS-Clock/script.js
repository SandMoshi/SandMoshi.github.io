/*
This code will grab the current time each second and update the clock
--------------------
Built By: Sand Moshi 
Inspired by Wes Bos' 30 day JS course
*/

//Create a link to the DOM elements
const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');

window.onload = function(){
	setDate();
	setTimeout( function(){	
		removeNoTransition();
   },950);
}

window.onfocus = function(){
	addNoTransition();
	setTimeout( function(){
		removeNoTransition();
	},500);
}

function removeNoTransition(){
//Function that adds a class the prevents hand transitions
		secondHand.classList.remove("notransition");			  
		minuteHand.classList.remove("notransition");			  
		hourHand.classList.remove("notransition");	
}

function addNoTransition(){
//Function that adds a class the prevents hand transitions
		secondHand.classList.add("notransition");			  
		minuteHand.classList.add("notransition");			  
		hourHand.classList.add("notransition");	
}

//Function that will move the clock hands
function setDate(){
	const now = new Date; //Get the time
		// console.log("Time = " + now);
	const seconds = now.getSeconds(); //Pull the seconds out of date
	const minutes = now.getMinutes(); //Pull the minutes out of date
	const hour = now.getHours(); 	  //Pull the hours out of date
	
	 	console.log("seconds = "+ seconds);
	
	const secondsDegrees = ((seconds/60)*360) + 90; //convert sec to degrees
		console.log("second Degrees = " + secondsDegrees);
	const minuteDegress = ((minutes/60)*360) + 90; //convert min to seconds then degrees
	const hourDegrees = ((hour/12)*360) + 90; //convert hour to degrees
	
	hourHand.style.transform = `rotate(${hourDegrees}deg)`;
	minuteHand.style.transform = `rotate(${minuteDegress}deg)`;
	if(seconds === 0){
		secondHand.classList.add("notransition");
		secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
		setTimeout( function(){
			secondHand.classList.remove("notransition");
    	},900);
		return; //Don't do the transform again
	}
	secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
}

//Call the setDate function every second
setInterval(setDate,1000);