import { settings } from './settings.js';
import { getTimeOfDay, getRandomNumber } from './utilities.js';

let bgImageNum = 0;
let flickrPhotoArr = [];

const getSlideNext = () => {
  if (settings.bgPhotoSource === 'github') {
    bgImageNum++;

    if (bgImageNum > 20) {
      bgImageNum = 1;
    }

    setImageFromGithub(bgImageNum);
  }
}

const getSlidePrev = () => {
  if (settings.bgPhotoSource === 'github') {
    bgImageNum--;

    if (bgImageNum < 1) {
      bgImageNum = 20;
    }

    setImageFromGithub(bgImageNum);
  }
}

const setBodyImage = (img) => {
  const bodyTag = document.querySelector('body');
  img.onload = () => bodyTag.style.backgroundImage = `url('${img.src}')`;
}

const setImageFromGithub = (imgNum) => {
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/brazhik/momentum-images/assets/images/${getTimeOfDay()}/${imgNum.toString().padStart(2, '0')}.jpg`;

  setBodyImage(img);
  showBgSlider(true);
}

const setImageFromUnsplash = async () => {
  const url = `https://api.unsplash.com/photos/random?query=${(settings.photoSourceTags.length > 0) ? settings.photoSourceTags : getTimeOfDay()}&client_id=osKYoa3tJu7rVIDvbIjbQwYZXkOsLKbFWRRregXA7Jw`;
  const res = await fetch(url);
  const responseBody = await res.json();

  const img = new Image();

  if (typeof responseBody !== 'undefined' && 'urls' in responseBody) {
    img.src = responseBody.urls.regular;
  } else {
    img.src = './assets/img/bgError.png';
  }

  setBodyImage(img);
  showBgSlider(false);
}

const setFlickrPhotosArray = async () => {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=069574d5f15c9ccdb7d5d9b59b91bf71&tags=${(settings.photoSourceTags.length > 0) ? settings.photoSourceTags : getTimeOfDay()}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const responseBody = await res.json();

  if (typeof responseBody.photos.photo !== 'undefined') {
    flickrPhotoArr = [...responseBody.photos.photo];
  } else {
    flickrPhotoArr.length = 0;
  }
}

const setImageFromFlickr = async (imgNum) => {
  const img = new Image();

  if (typeof flickrPhotoArr[imgNum - 1] !== 'undefined' && 'url_l' in flickrPhotoArr[imgNum - 1]) {
    img.src = flickrPhotoArr[imgNum - 1].url_l;
  } else {
    img.src = './assets/img/bgError.png';
  }

  setBodyImage(img);
  showBgSlider(false);
}

const showBgSlider = (isShow) => {
  const slideNext = document.querySelector('.slide-next');
  const slidePrev = document.querySelector('.slide-prev');

  if (isShow) {
    slideNext.style.display = slidePrev.style.display = 'block';
  } else {
    slideNext.style.display = slidePrev.style.display = 'none';
  }
}

export const setBackground = async () => {
  switch (settings.bgPhotoSource) {
    case 'unsplash':
      setImageFromUnsplash();
      break;

    case 'flickr':
      await setFlickrPhotosArray();

      if (flickrPhotoArr.length > 0) {
        bgImageNum = getRandomNumber(1, flickrPhotoArr.length);
      } else {
        bgImageNum = 1;
      }

      setImageFromFlickr(bgImageNum);
      break;

    default:
      bgImageNum = getRandomNumber(1, 20);
      setImageFromGithub(bgImageNum);
  }
}

export const setBgSlider = () => {
  const slideNext = document.querySelector('.slide-next');
  const slidePrev = document.querySelector('.slide-prev');

  slideNext.addEventListener('click', getSlideNext);
  slidePrev.addEventListener('click', getSlidePrev);
}
