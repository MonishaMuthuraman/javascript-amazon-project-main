import {getProducts} from '../data/products.js';
import {rendercheckoutHtml} from "./checkout/orderSummary.js";
import {paymentSummary} from "./checkout/paymentSummary.js";

//import "../data/products.js";
// import '../data/cart-class.js';

// const xhr = new XMLHttpRequest();
// xhr.open('GET','https://supersimplebackend.dev/cart');
// xhr.send();
// console.log(xhr.response);


// new Promise((resolve)=>{
//     getProducts(()=>{
//         resolve();
//     })
// }).then(()=>{
//     rendercheckoutHtml();
//     paymentSummary();
// });

function getProductsPromise(){
    return new Promise((resolve)=>{
        getProducts(()=>{
            resolve();
        })
    })
};

async function fetchData(){
    await getProductsPromise();
        rendercheckoutHtml();
        paymentSummary();
}

fetchData();

