//Don't allow deactived links to work
document.querySelector('a.deactive').style.pointerEvents="none";
const audio = document.querySelector('audio');
const dot = document.getElementsByClassName("dot")[0];
const bar = document.getElementsByClassName("bar")[0];


//Audio Player
function toggleAudio(e){
		const play = document.querySelector('.play');
		const speaker = document.querySelector('.speaker');
//		const pause = document.querySelector('.pause');
	
		// const audio = document.querySelector('audio');
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

		audio.addEventListener("ended",function(){
					const play = document.querySelector('.play');
				const speaker = document.querySelector('.speaker');
				play.src = "img/play-24.png";
				speaker.src="img/mute-2-24 (1).png";
		});

audio.addEventListener("timeupdate", function(){
	var currentTime = audio.currentTime;
	const duration = audio.duration;
	var percentPlayed = currentTime/duration;
	var barWidth = bar.offsetWidth;
	var px = percentPlayed*(barWidth - 20);
	dot.style.left = px + "px";
});