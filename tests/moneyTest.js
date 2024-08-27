import {formatCurrency} from "../scripts/utils/money.js";

console.log("TestSuite: formatCurrency[convert cents into dollars]");


console.log('Test case:1');
if(formatCurrency('1025') === '10.25'){
    console.log('passed');
}else{
    console.log('failed');
}

console.log('Test case:2');
if(formatCurrency('0') === '0.00'){
    console.log('passed');
}else{
    console.log('failed');
}

console.log('Test case:3');
if(formatCurrency('2000.5') === '20.01'){
    console.log('passed');
}else{
    console.log('failed');
}

console.log('Test case:4');
if(formatCurrency('2000.4') === '20.00'){
    console.log('passed');
}else{
    console.log('failed');
}