export const cart = [];

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
};