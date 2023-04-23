import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './currency.js';

// Business Logic

async function getExchange(foreignCurrency, amount) {
  const response = await CurrencyExchange.getExchange(foreignCurrency, amount);
  if (response.result) {
    printElements(response, foreignCurrency, amount); 
  } else {
    printError(response, foreignCurrency, amount); 
  }
}

// UI Logic

function printElements(results) {
  document.querySelector('#showResponse').innerText = `The exchange rate from USD to ${foreignCurrency} is ${results.conversion_rates[foreignCurrency]}%.`;
}

function printError(error, foreignCurrency) {
  document.querySelector('#showResponse').innerText = `Error accessing the exchange rate data for USD to ${foreignCurrency}: ${error}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const amount = document.querySelector('#amount').value;
  document.querySelector('#amount').value = null;
  const foreignCurrency = document.querySelector("select#select-currency").value;
  getExchange(foreignCurrency, amount);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});