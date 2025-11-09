const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const cover = document.querySelector('.cover');

// Playlist
const songs = [
  { title: 'Song One', artist: 'Artist A', src: 'music/song1.mp3', cover: 'images/img3.jpg' },
  { title: 'Song Two', artist: 'Artist B', src: 'music/song2.mp3', cover: 'images/img4.jpg' },
  { title: 'Song Three', artist: 'Artist C', src: 'music/song3.mp3', cover: 'images/img8.jpg' }
];

let songIndex = 0;
let isPlaying = false;

// Load a song
function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
}

// Play / Pause toggle
function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = '▶';
  } else {
    audio.play();
    playBtn.textContent = '⏸';
  }
  isPlaying = !isPlaying;
}

// Next / Previous
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  audio.play();
  isPlaying = true;
  playBtn.textContent = '⏸';
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  audio.play();
  isPlaying = true;
  playBtn.textContent = '⏸';
}

// Update progress bar
audio.addEventListener('timeupdate', () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume control
volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

// Autoplay next song
audio.addEventListener('ended', nextSong);

// Event listeners
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Initial load
loadSong(songIndex);
