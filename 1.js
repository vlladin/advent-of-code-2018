const fs = require('fs');

const data = fs.readFileSync('1.in').toString();

let numbers = data.split('\n').map(item => {
    return parseInt(item);
});

let sum = 0;

numbers.forEach(number => {
    sum += number;
})

console.log(sum);