import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './currency.js';

// Business Logic

async function getExchange(foreignCurrency) {
  const response = await CurrencyExchange.getExchange(foreignCurrency);
  if ((response["result"] === "success") ) { 
    printElements(response); 
  } else {
    printError(response, foreignCurrency);
  }
}

// UI Logic

function printElements(foreignCurrency) {
  let amountEntered = document.querySelector("input#amount").value; 
  let countryCode = document.querySelector("select#select-currency").value;
  let result = document.querySelector("#showResponse");
  let convertedAmount = foreignCurrency.conversion_rate;
  if (foreignCurrency && foreignCurrency.conversion_rate) {
    result.innerText = `Exchange rate: ${amountEntered} USD = ${(amountEntered * convertedAmount).toFixed(2)} ${countryCode}`;
  } else {
    result.innerText = `Error: Please enter an existing currency.`;
  }
}

function printError(error, foreignCurrency) {
  if (error["error-type"]) {
    document.querySelector('#showResponse').innerText = `Error accessing the exchange rate data for USD to ${foreignCurrency}: ${error["error-type"]}`;
  } else {
    document.querySelector('#showResponse').innerText = `Error accessing the exchange rate data for USD to ${foreignCurrency}: ${error.message}`;
  }
}

function handleFormSubmission(event) {
  event.preventDefault();
  document.querySelector('#showResponse').innerText = "";
  let foreignCurrency = document.querySelector("select#select-currency").value;
  getExchange(foreignCurrency);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});



