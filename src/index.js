import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './currency.js';

// Business Logic

async function getExchange(amount) {
  const response = await CurrencyExchange.getExchange(amount);
  if (response.main) {
    printElements(response, amount); 
  } else {
    printError(response); 
  }
}

// UI Logic

function printElements(results) {
  document.querySelector('#showResponse').innerText = `The exchange rate from USD to ${results[1]} is ${results[0].main.conversion_rates}%.`;
}

function printError(error) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the exchange rate data for ${error[2]}: ${error[0].status} ${error[0].statusText}: ${error[1].message}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const amount = document.querySelector('#amount').value;
  document.querySelector('#amount').value = null;
  getExchange(amount);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});