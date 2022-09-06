import { prepareLocalStorage } from './local-storage.js';
import { refreshDataEverySecond } from './time-date-greeting.js';
import { setBackground, setBgSlider } from './background.js';
import { setWeather } from './weather.js';
import { setQuote } from './quotes.js';
import { setAudioPlayer } from './audioplayer.js';
import { setSettingsWindow } from './settings.js';
import { setTodoWindow } from './todo.js';

prepareLocalStorage();
refreshDataEverySecond();
setBackground();
setBgSlider();
setWeather();
setQuote();
setAudioPlayer();
setSettingsWindow();
setTodoWindow();
