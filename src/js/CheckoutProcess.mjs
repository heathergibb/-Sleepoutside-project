import ShoppingCart from "./ShoppingCart.mjs";
import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemCount = 0;
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
  
    init() {
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary();
    }
  
    calculateItemSummary() {
      // calculate and display the total amount of the items in the cart, and the number of items.
      const cart = new ShoppingCart(this.key);
      const cartCount = cart.calculateCartTotals();
      this.itemCount = cartCount.itemCount;
      this.itemTotal = cartCount.cartTotal;

      const subCount = document.querySelector(this.outputSelector + " #item-count")
      const subSel = document.querySelector(this.outputSelector + " #subtotal")
       subCount.innerHTML = `${this.itemCount}`
      subSel.innerHTML = `$${this.itemTotal.toFixed(2)}`
    }
  
    calculateOrdertotal() {
      // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
      
        if (this.itemCount > 0) {
          this.shipping = 10 + (this.itemCount - 1) * 2;
        }
        
        this.tax = this.itemTotal * 0.06;

        this.orderTotal = this.itemTotal + this.shipping + this.tax;
      
      // display the totals.
      this.displayOrderTotals();
    }
  
    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary page
      const subShipping = document.querySelector(this.outputSelector + " #shipping")
      const subTax = document.querySelector(this.outputSelector + " #tax")
      const subTotal = document.querySelector(this.outputSelector + " #order-total")

      subShipping.innerHTML = `$${this.shipping.toFixed(2)}`
      subTax.innerHTML = `$${this.tax.toFixed(2)}`
      subTotal.innerHTML = `$${this.orderTotal.toFixed(2)}`
    }
  }