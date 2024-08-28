export let cart;
cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
  cart = [
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        checkoutId: '1'
    },
    {
      productId : "3ebe75dc-64d2-4137-8860-1f5a963e534b",
      quantity : 3,
      checkoutId: '3'
    }

];
}

export function addToCart(productId){
    const timerList = {};
    let itemInCart = false;
    let quantity =1 || Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    let checkoutId = '1';
    cart.forEach((item)=>{
      if(item.productId === productId){
        itemInCart = true;
        item.quantity += quantity;
      }
    });
    if(!itemInCart){
      cart.push({
        productId,
        quantity,
        checkoutId
      });
    }
        
    document.querySelector(`.js-added-to-cart-${productId}`).classList.add('added');
    if(timerList){
      clearTimeout(timerList[productId]);
    }
    let timerId = setTimeout(()=>{
      document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('added');
    },2000);
    timerList[productId]=timerId;
    SaveToStorage();
};

export function removeItem(productId){
  let newCart = [];
  cart.forEach((item)=>{
      if(item.productId !== productId){
          newCart.push(item);
      }
  });
  cart = newCart;
  SaveToStorage();
};

export function SaveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));  
}

export function calculateCartQuantity(){
  let totalQuantity = 0;
    cart.forEach((item)=>{
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  }

export function updateQuantity(productId,newQuantity){
  cart.forEach((item)=>{
    if(item.productId === productId){
      item.quantity = newQuantity;
    }
  });
  SaveToStorage();
  calculateCartQuantity();
}
 

