function Cart(localStorageKey){
const cart={
   cartItem : undefined,
   loadFromLocalStorage(){
    this.cartItem = JSON.parse(localStorage.getItem(localStorageKey));
    if(!this.cartItem){
      this.cartItem = [
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
    },
    addToCart(productId){
        const timerList = {};
        let itemInCart = false;
        let quantity =1 || Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
        let checkoutId = '1';
        this.cartItem.forEach((item)=>{
          if(item.productId === productId){
            itemInCart = true;
            item.quantity += quantity;
          }
        });
        if(!itemInCart){
          this.cartItem.push({
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
        this.SaveToStorage();
    },
    removeItem(productId){
        let newCart = [];
        this.cartItem.forEach((item)=>{
            if(item.productId !== productId){
                newCart.push(item);
            }
        });
        this.cartItemcart = newCart;
        this.SaveToStorage();
      },
      SaveToStorage(){
        localStorage.setItem(localStorageKey,JSON.stringify(this.cartItem));  
      },
      calculateCartQuantity(){
        let totalQuantity = 0;
          this.cartItem.forEach((item)=>{
            totalQuantity += item.quantity;
          });
          return totalQuantity;
        },
        updateQuantity(productId,newQuantity){
            this.cartItem.forEach((item)=>{
              if(item.productId === productId){
                item.quantity = newQuantity;
              }
            });
            this.SaveToStorage();
            this.calculateCartQuantity();
          }
};
return cart; 
}

const cart = Cart('cart-oop');
cart.loadFromLocalStorage();
cart.SaveToStorage();
console.log(cart);

const businesscart = Cart('cart-business');
businesscart.loadFromLocalStorage();
businesscart.SaveToStorage();
console.log(businesscart);