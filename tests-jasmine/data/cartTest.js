import {addToCart, cart} from "../../data/cart.js";

describe('Test Suite: addToCart',()=>{
    // it('adds an existing product to cart',()=>{       
    // });
    it('adds new product to cart',()=>{
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake();
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        console.log(cart);
    });
});