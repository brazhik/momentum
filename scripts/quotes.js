import { settings } from './settings.js';
import { getRandomNumber } from './utilities.js';

const updateQuote = async () => {
  const quotes = `./assets/quotes/quotes-${settings.language}.json`;
  const response = await fetch(quotes);
  const responseBody = await response.json();

  const quote = responseBody[getRandomNumber(0, responseBody.length - 1)];

  const quoteTag = document.querySelector('.quote');
  const authorTag = document.querySelector('.author');

  quoteTag.textContent = quote.text;
  authorTag.textContent = quote.author;
}

export const setQuote = async () => {
  const updateButton = document.querySelector('.change-quote');
  updateButton.addEventListener('click', updateQuote);

  updateQuote();
}
