import translate from './translate.js';
import { settings } from './settings.js';
import { getTimeOfDay } from './utilities.js';

const showTime = () => {
  const timeTag = document.querySelector('.time');
  const date = new Date();
  timeTag.textContent = date.toLocaleTimeString(settings.language, { hour12: false });
}

const showDate = () => {
  const dateTag = document.querySelector('.date');
  const date = new Date();
  dateTag.textContent = date.toLocaleDateString(settings.language, { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

const showGreeting = () => {
  const greetingTag = document.querySelector('.greeting');
  greetingTag.textContent = `${translate[settings.language].greeting[getTimeOfDay()]},`;

  const nameInput = document.querySelector('.name');
  nameInput.placeholder = `${translate[settings.language].greeting.placeholder}`;
}

export const refreshDataEverySecond = () => {
  showTime();
  showDate();
  showGreeting();

  setTimeout(refreshDataEverySecond, 1000);
}
