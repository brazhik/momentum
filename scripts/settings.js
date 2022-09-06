import translate from './translate.js';
import { setBackground } from './background.js';
import { todoOptions } from './todo.js';

export const settings = {
  language: 'en', // ['en', 'ru']
  bgPhotoSource: 'github', // ['github', 'unsplash', 'flickr']
  photoSourceTags: 'nature',
  blocks: ['time', 'date', 'greeting', 'quote', 'weather', 'audioplayer', 'todo']
};

const showSettingsWindow = () => {
  const settingsWindow = document.querySelector('.settings-window');
  settingsWindow.classList.add('settings-window-active');
}

const closeSettingsWindow = () => {
  const settingsWindow = document.querySelector('.settings-window');
  settingsWindow.classList.remove('settings-window-active');
}

const changeLanguage = () => {
  const languageEnRadio = document.getElementById('language-en-radio');
  const languageRuRadio = document.getElementById('language-ru-radio');

  if (languageEnRadio.checked && settings.language !== 'en') {
    settings.language = 'en';
    location.reload();
  } else if (languageRuRadio.checked && settings.language !== 'ru') {
    settings.language = 'ru';
    location.reload();
  }
}

const showTagsSection = (isShow) => {
  const photoSourceTags = document.querySelector('.photo-source-tags');

  if (isShow) {
    photoSourceTags.style.display = 'flex';
  } else {
    photoSourceTags.style.display = 'none';
  }
}

const changePhotoSource = () => {
  const photoSourceUnsplashRadio = document.getElementById('photo-source-unsplash-radio');
  const photoSourceFlickrRadio = document.getElementById('photo-source-flickr-radio');

  switch (true) {
    case photoSourceUnsplashRadio.checked:
      if (settings.bgPhotoSource !== 'unsplash') {
        settings.bgPhotoSource = 'unsplash';
        showTagsSection(true);
        setBackground();
      }
      break;

    case photoSourceFlickrRadio.checked:
      if (settings.bgPhotoSource !== 'flickr') {
        settings.bgPhotoSource = 'flickr';
        showTagsSection(true);
        setBackground();
      }
      break;

    default:
      if (settings.bgPhotoSource !== 'github') {
        settings.bgPhotoSource = 'github';
        showTagsSection(false);
        setBackground();
      }
  }
}

const setPhotoSourceTags = () => {
  const input = document.querySelector('.photo-source-tags-input');
  settings.photoSourceTags = input.value;
  setBackground();
}

const loadBlocksCheckboxes = () => {
  settings.blocks.forEach(
    (item) => {
      const checkbox = document.getElementById(`blocks-${item}-checkbox`);
      if (checkbox !== null) {
        checkbox.checked = true;
      }
    }
  );
}

const processBlock = (event) => {
  const blockName = event.target.id.split('-')[1];

  if (event.target.checked) {
    settings.blocks.push(blockName);
  } else {
    settings.blocks.splice(settings.blocks.indexOf(blockName), 1);
  }

  displayBlocksBySettings();
}

const blockClassListHide = (block, blockName) => {
  if (settings.blocks.includes(blockName)) {
    block.classList.remove('hide');
  } else {
    block.classList.add('hide');
  }
}

const displayBlocksBySettings = () => {
  const time = document.querySelector('.time');
  blockClassListHide(time, 'time');

  const date = document.querySelector('.date');
  blockClassListHide(date, 'date');

  const greeting = document.querySelector('.greeting-container');
  blockClassListHide(greeting, 'greeting');

  const quote = document.querySelector('.quote-wrapper');
  blockClassListHide(quote, 'quote');

  const weather = document.querySelector('.weather');
  blockClassListHide(weather, 'weather');

  const audioplayer = document.querySelector('.player');
  blockClassListHide(audioplayer, 'audioplayer');

  const todo = document.querySelector('.todo-wrapper');
  blockClassListHide(todo, 'todo');

  const todoWindow = document.querySelector('.todo-window');
  if (!settings.blocks.includes('todo')) {
    todoWindow.classList.remove('todo-window-active');
    todoOptions.windowActive = false;
  }
}

export const setSettingsWindow = () => {
  const settingsButton = document.querySelector('.settings');
  settingsButton.addEventListener('click', showSettingsWindow);

  const settingsCloseButton = document.querySelector('.settings-window-close-button');
  settingsCloseButton.addEventListener('click', closeSettingsWindow);

  // if click was outside settings window and not at settings button, then close window
  document.addEventListener('click',
    (event) => {
      const settingsWindow = document.querySelector('.settings-window');
      if (!settingsWindow.contains(event.target) && !settingsButton.contains(event.target)) {
        closeSettingsWindow();
      }
    }
  );

  const settingsTitle = document.querySelector('.settings-title');
  settingsTitle.textContent = translate[settings.language].settings.title;

  const languageTitle = document.querySelector('.language-title');
  languageTitle.textContent = `${translate[settings.language].settings.language.title}:`;

  const languageEn = document.querySelector('.language-en');
  languageEn.textContent = translate[settings.language].settings.language.en;

  const languageRu = document.querySelector('.language-ru');
  languageRu.textContent = translate[settings.language].settings.language.ru;

  const languageEnRadio = document.getElementById('language-en-radio');
  languageEnRadio.addEventListener('click', changeLanguage);

  const languageRuRadio = document.getElementById('language-ru-radio');
  languageRuRadio.addEventListener('click', changeLanguage);

  if (settings.language === 'en') {
    languageEnRadio.checked = true;
  } else {
    languageRuRadio.checked = true;
  }

  const photoSourceTitle = document.querySelector('.photo-source-title');
  photoSourceTitle.textContent = `${translate[settings.language].settings.photoSource.title}:`;

  const photoSourceGithubRadio = document.getElementById('photo-source-github-radio');
  photoSourceGithubRadio.addEventListener('click', changePhotoSource);

  const photoSourceUnsplashRadio = document.getElementById('photo-source-unsplash-radio');
  photoSourceUnsplashRadio.addEventListener('click', changePhotoSource);

  const photoSourceFlickrRadio = document.getElementById('photo-source-flickr-radio');
  photoSourceFlickrRadio.addEventListener('click', changePhotoSource);

  switch (settings.bgPhotoSource) {
    case 'unsplash':
      photoSourceUnsplashRadio.checked = true;
      showTagsSection(true);
      break;

    case 'flickr':
      photoSourceFlickrRadio.checked = true;
      showTagsSection(true);
      break;

    default:
      photoSourceGithubRadio.checked = true;
      showTagsSection(false);
  }

  const photoSourceTagsLabel = document.querySelector('.photo-source-tags-label');
  photoSourceTagsLabel.textContent = `${translate[settings.language].settings.photoSource.tags}:`;

  const photoSourceTagsInput = document.querySelector('.photo-source-tags-input');
  photoSourceTagsInput.addEventListener('change', setPhotoSourceTags);

  photoSourceTagsInput.value = settings.photoSourceTags;

  const blocksTitle = document.querySelector('.blocks-title');
  blocksTitle.textContent = `${translate[settings.language].settings.blocks.title}:`;

  const blocksCheckboxes = document.querySelectorAll('.blocks-settings > div > input');
  blocksCheckboxes.forEach(
    (item) => {
      const blockName = item.id.split('-')[1];

      const label = document.querySelector(`.blocks-${blockName}`);
      label.textContent = translate[settings.language].settings.blocks[blockName];

      item.addEventListener('click', processBlock);
    }
  );

  loadBlocksCheckboxes();
  displayBlocksBySettings();
}
