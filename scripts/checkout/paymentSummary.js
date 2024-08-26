import {calculateCartQuantity,cart} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { checkoutOptions } from "../checkoutOption.js";
import {formatCurrency} from "../utils/money.js";

export function paymentSummary(){
const quantity = calculateCartQuantity();
const totalprice = Number(calculatepaymentPrice());
const shippingcharge = Number(calculateShipping());
const priceWithShipping = Number(TotalBeforetax());

const paymentSummaryHTML = 
`<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${quantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(totalprice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingcharge)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(priceWithShipping)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(priceWithShipping*0.1)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(priceWithShipping+(priceWithShipping*0.1))}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`

document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML;

function calculatepaymentPrice(){
    let quantity;
    let priceCents;
    let totalPrice = 0;
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        products.forEach((product) => {
            if (productId === product.id) {
                quantity = cartItem.quantity;
                priceCents = product.priceCents;
                const priceinCents = quantity*priceCents;
                totalPrice += Number(priceinCents);
            }
        });
       });    
    return totalPrice;
}

function calculateShipping(){
    let priceCents;
    let totalshipping = 0;
      cart.forEach((cartItem)=>{
        checkoutOptions.forEach((option)=>{
            if(cartItem.checkoutId === option.id){
                priceCents = option.priceCents;
                totalshipping += Number(priceCents);
            }
        })
      });
    return totalshipping;
}

function TotalBeforetax(){
    return (totalprice+shippingcharge);
}
}
