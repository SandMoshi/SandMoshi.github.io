//Don't allow deactived links to work
document.querySelector('a.deactive').style.pointerEvents="none";

//Audio Player
function toggleAudio(e){
		const play = document.querySelector('.play');
		const speaker = document.querySelector('.speaker');
//		const pause = document.querySelector('.pause');
	
		const audio = document.querySelector('audio');
		if (!audio.paused){
			audio.pause();
			play.src = "img/play-24.png";
			speaker.src="img/mute-2-24 (1).png";
		}
		else{
			// audio.currentTime = 0; //rewind
			play.src = "img/media-pause-24.png";
			speaker.src = "img/volume-up-4-24.png";
			audio.play();
		}
}

		const audio = document.querySelector('audio').addEventListener("ended",function(){
			 	const play = document.querySelector('.play');
				const speaker = document.querySelector('.speaker');
				play.src = "img/play-24.png";
				speaker.src="img/mute-2-24 (1).png";
		});
		