import { cart,removeItem,calculateCartQuantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import formatCurrency from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const currentDate = dayjs();
const fastdeliveryDate = currentDate.add(7,'day').format("dddd, MMMM D");
const mediumdeliveryDate = currentDate.add(3,'day').format("dddd, MMMM D");
const slowdeliveryDate = currentDate.add(1,'day').format("dddd, MMMM D");
//console.log(dateFormat);
let allCartElements=``;



cart.forEach((cartItem) => {
    //console.log(cartItem);
    const productId = cartItem.productId;
    var productDetails;
    products.forEach((product) => {
        if (productId === product.id) {
            productDetails = product;
        }
    });
    const checkouthtml =
    `<div class="cart-item-container js-item-container-${productDetails.id}">
    <div class="delivery-date">
        Delivery date: Tuesday, June 21
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
        <div class="delivery-option">
            <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${productId}">
            <div>
            <div class="delivery-option-date">
                ${fastdeliveryDate}
            </div>
            <div class="delivery-option-price">
                FREE Shipping
            </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${productId}">
            <div>
            <div class="delivery-option-date">
                ${mediumdeliveryDate}
            </div>
            <div class="delivery-option-price">
                $4.99 - Shipping
            </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${productId}">
            <div>
            <div class="delivery-option-date">
                ${slowdeliveryDate}
            </div>
            <div class="delivery-option-price">
                $9.99 - Shipping
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>`;
    allCartElements += checkouthtml;
});

document.querySelector('.order-summary').innerHTML = allCartElements;
updateCheckoutQuantity();

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
    });
});

function updateCheckoutQuantity(){
    let quantity = calculateCartQuantity();
document.querySelector(".js-cart-quantity").innerHTML = `${quantity} items`;
}

