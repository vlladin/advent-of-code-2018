const fs = require('fs');

const data = fs.readFileSync('1.in').toString();

let numbers = data.split('\n').map(item => {
    return parseInt(item);
});

let seenFreq = { 0: true };
let currentFreq = 0;
let duplicateFreq;

findSameFreq();

function findSameFreq() {
    for (let i = 0; i < numbers.length; i++) {
        let number = numbers[i];

        currentFreq += number;

        if (seenFreq[currentFreq]) {
            duplicateFreq = currentFreq;
            console.log("Same freq:", duplicateFreq);
            return;
        } else {
            seenFreq[currentFreq] = true;
        }
    }

    setTimeout(findSameFreq, 0);
}