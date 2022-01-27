const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const title = document.querySelector("#title");
const image = document.querySelector("#image");

const songs = [
  "Mohsen Yeganeh - Behet Ghol Midam",
  "Mohsen Yeganeh - Khodkhah",
  "Mohsen Yeganeh - Obour",
];
let songIndex = 2;

loadSong(songs[songIndex]);
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  image.src = `images/${song}.jpg`;
}
/////////===============play-pause-prev-next===============/////////
playBtn.addEventListener("click", () => {
  if (musicContainer.classList.contains("play")) {
    pauseSong();
  } else {
    playSong();
  }
});

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.bx").classList.remove("bx-play-circle");
  playBtn.querySelector("i.bx").classList.add("bx-pause-circle");
  audio.play();
}
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.bx").classList.remove("bx-pause-circle");
  playBtn.querySelector("i.bx").classList.add("bx-play-circle");
  audio.pause();
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}
audio.addEventListener("ended", nextSong);

/////////===============progress-container===============/////////
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const musicTimecurrent = document.querySelector(".musicTime__current");
const musicTimelast = document.querySelector(".musicTime__last");

audio.addEventListener("timeupdate", updateProgress);
function updateProgress(e) {
  const { duration, currentTime } = e.target;
  const progressPrecent = (currentTime / duration) * 100;
  progress.style.width = `${progressPrecent}%`;
}
audio.addEventListener("timeupdate", DurTime);
function DurTime() {
  const minute = Math.floor(audio.currentTime / 60);
  const second = Math.floor(audio.currentTime % 60);
  musicTimecurrent.innerHTML =
    ("0" + minute).substr(-2) + ":" + ("0" + second).substr(-2);

  const leftTime = audio.duration - audio.currentTime;
  const leftMinute = Math.floor(leftTime / 60);
  const leftSecond = Math.floor(leftTime % 60);
  musicTimelast.innerHTML =
    ("0" + leftMinute).substr(-2) + ":" + ("0" + leftSecond).substr(-2);
}

progressContainer.addEventListener("click", setprogress);
function setprogress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

/////////===============volume===============/////////
const volumeicon = document.getElementById("volume-icon");
const volumeiconmute = document.getElementById("volume-icon-mute");
const inputSlide = document.querySelector("input");
const resentvolume = document.querySelector("#volume");
const volumeshow = document.getElementById("volume-show"); //عدد
inputSlide.style.background = `linear-gradient(to right, var(--black) 0%, var(--black) ${inputSlide.value}%, var(--secondaryColor) ${inputSlide.value}%, var(--secondaryColor) 100%)`;
volumeshow.innerText = resentvolume.value;
resentvolume.addEventListener("click", volume_change);
function volume_change() {
  volumeshow.innerHTML = resentvolume.value;
  audio.volume = resentvolume.value / 100;
  inputSlide.style.background = `linear-gradient(to right, var(--black) 0%, var(--black) ${inputSlide.value}%, var(--secondaryColor) ${inputSlide.value}%, var(--secondaryColor) 100%)`;
  if (resentvolume.value == 0) {
    volumeiconmute.style.display = "block";
    volumeicon.style.display = "none";
  } else {
    volumeiconmute.style.display = "none";
    volumeicon.style.display = "block";
  }
}
