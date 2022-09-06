import playlist from './playlist.js';

const audio = new Audio();
let isPlaying = false;
let trackNum = 0;

const playOrPauseAudio = () => {
  if (isPlaying) {
    audio.play();
  } else {
    audio.pause();
  }
}

const playActiveTrack = () => {
  togglePlayState();
  playOrPauseAudio();
}

const togglePlayState = () => {
  isPlaying = !isPlaying;

  const playButton = document.querySelector('.play');

  if (isPlaying) {
    playButton.classList.add('pause');
  } else {
    playButton.classList.remove('pause');
  }
}

const playPrevTrack = () => {
  if (trackNum > 0) {
    trackNum--;
  } else {
    trackNum = playlist.length - 1;
  }

  setActiveTrack();
  playOrPauseAudio();
}

const playNextTrack = () => {
  if (trackNum < playlist.length - 1) {
    trackNum++;
  } else {
    trackNum = 0;
  }

  setActiveTrack();
  playOrPauseAudio();
}

const setTrackLength = () => {
  const trackLength = document.querySelector('.time-length');
  trackLength.textContent = getTimeFromNum(audio.duration);
}

const onTimelineClick = (event) => {
  const timeline = document.querySelector(".player-timeline");
  const timelineWidth = window.getComputedStyle(timeline).width;

  audio.currentTime = event.offsetX / parseInt(timelineWidth) * audio.duration;
}

const updateProgressBar = () => {
  setInterval(() => {
    const progressBar = document.querySelector(".player-progress");
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";

    const currentTime = document.querySelector(".time-current");
    currentTime.textContent = getTimeFromNum(audio.currentTime);
  }, 500);
}

const getTimeFromNum = (num) => {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;

  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) {
    return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  } else {
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  }
}

const setActiveTrack = () => {
  audio.src = playlist[trackNum].src;
  audio.currentTime = 0;

  const trackName = document.querySelector('.player-track-name');
  trackName.textContent = playlist[trackNum].title;

  const playlistContainer = document.querySelector('.playlist');

  playlistContainer.childNodes.forEach(
    (item, index) => {
      item.classList.remove('item-active');

      if (index === trackNum) {
        item.classList.add('item-active');
      }
    }
  );
}

const toggleVolume = () => {
  audio.muted = !audio.muted;

  const volumeIcon = document.querySelector('.volume');

  if (audio.muted) {
    volumeIcon.classList.remove('icon-volume-on');
    volumeIcon.classList.add('icon-volume-off');
  } else {
    volumeIcon.classList.add('icon-volume-on');
    volumeIcon.classList.remove('icon-volume-off');
  }
}

const onVolumeSliderClick = (event) => {
  const volumeSlider = document.querySelector('.volume-slider');
  audio.volume = event.offsetX / parseInt(window.getComputedStyle(volumeSlider).width);

  const volumePercentage = document.querySelector('.volume-percentage');
  volumePercentage.style.width = audio.volume * 100 + '%';
}

const createPlaylist = () => {
  const playlistContainer = document.querySelector('.playlist');

  playlist.forEach(
    (item, index) => {
      const li = document.createElement('li');
      li.classList.add('play-item');
      li.innerHTML = `${item.title} <span class="play-item-button">${index}</span>`;
      playlistContainer.append(li);
    }
  );

  const playItemButtons = document.querySelectorAll('.play-item-button');
  playItemButtons.forEach((item) => item.addEventListener('click', onSelectTrack));

  setActiveTrack();
}

const onSelectTrack = (event) => {
  let selectedTrackNum = parseInt(event.target.textContent);

  if (trackNum === selectedTrackNum || isPlaying === false) {
    togglePlayState();
  }

  if (trackNum !== selectedTrackNum) {
    trackNum = selectedTrackNum;
    setActiveTrack();
  }

  playOrPauseAudio();
}

export const setAudioPlayer = () => {
  const playButton = document.querySelector('.play');
  playButton.addEventListener('click', playActiveTrack);

  const prevButton = document.querySelector('.play-prev');
  prevButton.addEventListener('click', playPrevTrack);

  const nextButton = document.querySelector('.play-next');
  nextButton.addEventListener('click', playNextTrack);

  const volumeButton = document.querySelector('.volume-button');
  volumeButton.addEventListener('click', toggleVolume);

  audio.addEventListener('ended', playNextTrack);
  audio.addEventListener('loadeddata', setTrackLength);

  const timeline = document.querySelector(".player-timeline");
  timeline.addEventListener('click', onTimelineClick);

  const volumeSlider = document.querySelector(".volume-slider");
  volumeSlider.addEventListener('click', onVolumeSliderClick);

  updateProgressBar();
  createPlaylist();
}
