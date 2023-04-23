import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './currency.js';

// Business Logic

async function getExchange() {
  const response = await CurrencyExchange.getExchange();
  if (response.main) {
    printElements(response); 
  } else {
    printError(response); 
  }
}

// UI Logic

function printElements(data) {
  document.querySelector('#showResponse').innerText = `The change rate from USD to ${data[1]} is ${data[0].main.humidity}%.`;
}

function printError(error) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the exchange rate data for ${error[2]}: ${error[0].status} ${error[0].statusText}: ${error[1].message}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  // const city = document.querySelector('#location').value;
  // document.querySelector('#location').value = null;
  getExchange();
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});