import translate from './translate.js';
import { settings } from './settings.js';
import { todoOptions } from './todo.js';

export const prepareLocalStorage = () => {
  // window.addEventListener('load', getLocalStorage);
  getLocalStorage();
  window.addEventListener('beforeunload', setLocalStorage);
}

const getLocalStorage = () => {
  const settingsLS = JSON.parse(localStorage.getItem('settings'));

  if (settingsLS) {
    for (let key in settingsLS) {
      settings[key] = settingsLS[key];
    }
  }

  const todoOptionsLS = JSON.parse(localStorage.getItem('todo'));

  if (todoOptionsLS) {
    for (let key in todoOptionsLS) {
      todoOptions[key] = todoOptionsLS[key];
    }
  }

  const nameInputTag = document.querySelector('.name');
  const nameLS = localStorage.getItem('name');

  if (nameLS) {
    nameInputTag.value = nameLS;
  }

  const cityInputTag = document.querySelector('.city');
  const cityLS = localStorage.getItem('city');

  if (cityLS) {
    cityInputTag.value = cityLS;
  } else {
    cityInputTag.value = translate[settings.language].weather.city;
  }
}

const setLocalStorage = () => {
  const nameInputTag = document.querySelector('.name');
  localStorage.setItem('name', nameInputTag.value);

  const cityInputTag = document.querySelector('.city');
  localStorage.setItem('city', cityInputTag.value);

  localStorage.setItem('settings', JSON.stringify(settings));
  localStorage.setItem('todo', JSON.stringify(todoOptions));
}
