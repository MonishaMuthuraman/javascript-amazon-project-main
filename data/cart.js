// export let cart = [
//     // {
//     //     productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//     //     quantity: 2
//     // },
//     // {
//     //   productId : "3ebe75dc-64d2-4137-8860-1f5a963e534b",
//     //   quantity : 3
//     // }

// ];

export let cart = JSON.parse(localStorage.getItem('cart'));


export function addToCart(productId){
    const timerList = {};
    let itemInCart = false;
    let quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    cart.forEach((item)=>{
      if(item.productId === productId){
        itemInCart = true;
        item.quantity += quantity;
      }
    });
    if(!itemInCart){
      cart.push({
        productId,
        quantity
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

function SaveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));  
}

export function calculateCartQuantity(){
  let totalQuantity = 0;
    cart.forEach((item)=>{
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  }