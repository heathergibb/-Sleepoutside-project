import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();
const myCheckout = new CheckoutProcess("addToCart", ".order-summary");
myCheckout.init();

window.addEventListener("load", function() {
  const zipInput = document.querySelector("#zip").value.trim();
  if (zipInput) {
    myCheckout.calculateOrdertotal(myCheckout);
  }
})

document
  .querySelector("#zip")
  .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));

document.querySelector("#checkout-submit").addEventListener("click", (e) => {
  e.preventDefault();

  myCheckout.checkout(document.forms["checkout-form"]);
});
