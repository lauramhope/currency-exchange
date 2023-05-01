import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './currency.js';

// Business Logic

async function getExchange(foreignCurrency) {
  const response = await CurrencyExchange.getExchange(foreignCurrency);
  if ((response["result"] === "success") ) { 
    printElements(response, foreignCurrency); 
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
  if (foreignCurrency) {
    result.innerText = `Exchange rate: ${amountEntered} USD = ${(amountEntered * convertedAmount).toFixed(2)} ${countryCode}`;
  } else {
    result.innerText = `Error: Please enter an existing currency.`;
  }
}

function printError(error, foreignCurrency) {
  document.querySelector('#showResponse').innerText = `Error accessing the exchange rate data for USD to ${foreignCurrency}: ${error}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  document.querySelector('#showResponse').innerText = "";
  let foreignCurrency = document.querySelector("select#select-currency").value;
  // let foreignCurrency = "ABC";
  getExchange(foreignCurrency);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});



