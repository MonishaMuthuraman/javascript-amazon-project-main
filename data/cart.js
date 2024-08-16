export const cart = [
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
    },
    {
      productId : "3ebe75dc-64d2-4137-8860-1f5a963e534b",
      quantity : 3
    }

];

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