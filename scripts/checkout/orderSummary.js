import { cart,removeItem,calculateCartQuantity, updateQuantity,SaveToStorage } from "../../data/cart.js";
import { products } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {checkoutOptions} from "../checkoutOption.js";
import { paymentSummary } from "./paymentSummary.js";


// const mediumdeliveryDate = currentDate.add(3,'day').format("dddd, MMMM D");
// const slowdeliveryDate = currentDate.add(1,'day').format("dddd, MMMM D");
// //console.log(dateFormat);
export function rendercheckoutHtml(){
let allCartElements=``;
var deliveryDate;
cart.forEach((cartItem) => {
    // console.log(cartItem.quantity);
    const productId = cartItem.productId;
    var productDetails;
    const currentDate = dayjs();
    checkoutOptions.forEach((options)=>{
        if(cartItem.checkoutId === options.id){
            deliveryDate = currentDate.add(options.deliveryDays,'day').format("dddd, MMMM D");
        }
    });
    products.forEach((product) => {
        if (productId === product.id) {
            productDetails = product;
            console.log(productDetails);
        }
    });
    const checkouthtml =
    `<div class="cart-item-container js-item-container-${productDetails.id}">
    <div class="delivery-date">
        Delivery date: ${deliveryDate}
    </div>

    <div class="cart-item-details-grid">
        <img class="product-image"
        src="${productDetails.image}">

        <div class="cart-item-details">
        <div class="product-name">
        ${productDetails.name}
        </div>
        <div class="product-price">
            $${formatCurrency(productDetails.priceCents)}
        </div>
        <div class="product-quantity">
            <span>
            Quantity: <span class="quantity-label js-quantity-label-${productDetails.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quality-btn" data-product-id=${productDetails.id}>
            Update
            </span>
            <input class="quantity-input js-quantity-input js-quantity-input-${productDetails.id}">
            <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id=${productDetails.id}>Save</span>
            <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${productDetails.id}">
            Delete
            </span>
        </div>
        </div>
        <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
        ${showCheckoutOptions(productId,cartItem)}
        </div>
    </div>
    </div>`;
    allCartElements += checkouthtml;
});
document.querySelector('.order-summary').innerHTML = allCartElements;
updateCheckoutQuantity();
paymentSummary();


function showCheckoutOptions(productId,cartItem){
    let html=``;
checkoutOptions.forEach((options)=>{
    const currentDate = dayjs();
    const ischecked = options.id===cartItem.checkoutId;
    const deliveryDate = currentDate.add(options.deliveryDays,'day').format("dddd, MMMM D");
    html += 
        `<div class="delivery-option">
            <input type="radio" ${ischecked?'checked':''}
            class="delivery-option-input js-delivery-options"
            name="delivery-option-${productId}" data-delivery-option-id=${options.id} data-product-id=${productId}>
            <div>
            <div class="delivery-option-date">
                ${deliveryDate}
            </div>
            <div class="delivery-option-price">
                ${(options.priceCents===0)?'FREE':(options.priceCents/100)} Shipping
            </div>
            </div>
        </div>`
});
return html;
}


document.querySelectorAll('.js-delete-quantity-link')
.forEach((link)=>{
    {
        link.addEventListener('click',()=>{
            // console.log(link.dataset.productId);
            const productId = link.dataset.productId;
            removeItem(productId);
            let itemToRemove = document.querySelector(`.js-item-container-${productId}`);
  itemToRemove.remove();
  updateCheckoutQuantity();
  paymentSummary();
        });
    }
});


document.querySelectorAll('.js-update-quality-btn').forEach((update)=>{
    update.addEventListener('click',()=>{
        const productId = update.dataset.productId;
        document.querySelector(`.js-item-container-${productId}`).classList.add("is-editing-quantity");
    });
});

document.querySelectorAll('.js-save-quantity-link').forEach((link)=>{
    link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
        document.querySelector(`.js-item-container-${productId}`).classList.remove("is-editing-quantity");
        const quantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
        updateQuantity(productId,quantity);
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML = quantity;
        updateCheckoutQuantity();
        paymentSummary();
    });
});

function updateCheckoutQuantity(){
    let quantity = calculateCartQuantity();
document.querySelector(".js-cart-quantity").innerHTML = `${quantity} items`;
}

document.querySelectorAll('.js-delivery-options').forEach((element)=>
    {
        element.addEventListener('click', ()=>{
            const {productId,deliveryOptionId} = element.dataset; 
            cart.forEach((cartItem)=>{
              if(cartItem.productId === productId){
                  cartItem.checkoutId = deliveryOptionId;
              }
          });
          checkoutOptions.forEach((option)=>{
            if(deliveryOptionId === option.id){
                updateDeliveryDate(option.deliveryDays);
                rendercheckoutHtml();
                paymentSummary();
            }
          });
          SaveToStorage();
        });
    });

function updateDeliveryDate(daysnumber){
    const currentDate = dayjs();
    deliveryDate = currentDate.add(daysnumber,'day').format("dddd, MMMM D");
}
}

