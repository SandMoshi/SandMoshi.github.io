window.addEventListener('keydown',function(e){
		//Send event (e) to the playSound function
	  playSound(e);
});

window.addEventListener('click',function(e){
		//Send event (e) to the playSound function
	  playSound(e);
});

function playSound(e){
	 
	 var keyPressed = e.keyCode;
	//-------------------------------------------------
	//Convert numeric row keys to numpad
	try{ // prevents errrors when letters are pressed 
		 var correspondingKeys = [
				{'key':'49', 'alternate':'97'},
				{'key':'50', 'alternate':'98'},
				{'key':'51', 'alternate':'99'},
				{'key':'52', 'alternate':'100'},
				{'key':'53', 'alternate':'101'},
				{'key':'54', 'alternate':'102'},
				{'key':'55', 'alternate':'103'},
				{'key':'56', 'alternate':'104'},
				{'key':'57', 'alternate':'105'},
		 ];
		 var oldKey = "" + e.keyCode + "";
		 console.log("oldKey = " + oldKey);
		 var obj = correspondingKeys.filter(function ( obj ){
			 return obj.key === oldKey;
		 })[0];
		  keyPressed = obj.alternate;
	    console.log("alternate = "+ keyPressed);
	}
	catch(TypeError){
		//If alternate key doesn't exist ignore TypeError that results
	};
  //-------------------------------------------------
	
	 var audio = document.querySelector(`audio[data-key="${keyPressed}"]`);
	 //if the keycode doesn't match anything, check to see if element was clicked instead
	 if(!audio){
		 		console.log(e); //Show which element was clicked
		 		var datakey = e.target.parentElement.getAttribute("data-key");
		    audio = document.querySelector(`audio[data-key="`+ datakey +`"]`);
		 }
	 //if no audio element matches keycode or click, then do nothing
	 if(!audio){
		 	console.log('null key pressed..doing nothing');
			return;
	 }
	 console.log("const audio= " + audio);
	 //--
	 var key = document.querySelector(`.key[data-key="${keyPressed}"]`);
	 //If the keycode doesn't match, check to see if element was clicked
	 if (key === null){
		 //Try getting it based on click target instead of keycode
		 key = document.querySelector(`.key[data-key="`+ datakey +`"]`);
	 }
	 key.classList.add("playing");
	 console.log("const key= " + key);
	 //--
	 //--
	 audio.currentTime = 0; 
	 audio.play(); 
	
	 const audiokeys = document.querySelectorAll(".key");
	//removed because of arrow function compatibility on iOS
//	 keys.forEach(key => key.addEventListener('transitionend', removeTransition));
	 Array.prototype.forEach.call (audiokeys, function(key){ 
		 key.addEventListener('transitionend', removeTransition);
	 });
} 


function removeTransition(e){
	if(e.propertyName !== 'transform') return; //only remove transition if it is a transform
	console.log(this);
	this.classList.remove("playing"); //remove class and revert to original style
}

