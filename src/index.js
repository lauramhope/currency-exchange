import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './currency.js';

// Business Logic

async function getExchange(foreignCurrency, amount) {
  const response = await CurrencyExchange.getExchange(foreignCurrency, amount);
  console.log(response);
  console.log(foreignCurrency);
  console.log(amount); 
  if (response.result) {
    printElements(response, foreignCurrency, amount); 
  } else {
    printError(response, foreignCurrency, amount); 
  }
}

// UI Logic

function printElements(result, target_code) {
  let amountEntered = document.querySelector("input#amount").value; 
  document.querySelector('#showResponse').innerText = `The exchange rate from $${amountEntered} USD to ${target_code} is ${result.conversion_result}%.`;
}

function printError(error, foreignCurrency) {
  document.querySelector('#showResponse').innerText = `Error accessing the exchange rate data for USD to ${foreignCurrency}: ${error}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const amount = document.querySelector('#amount').value;
  const foreignCurrency = document.querySelector("select#select-currency").value;
  getExchange(foreignCurrency, amount);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});