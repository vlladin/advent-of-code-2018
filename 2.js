const fs = require('fs');

const data = fs.readFileSync('2.in').toString();
const boxes = data.split('\n');

let hasTwo = 0;
let hasThree = 0;

boxes.forEach(box => {
    if (countLetters(box, 2)) {
        hasTwo += 1;
    }
    if (countLetters(box, 3)) {
        hasThree += 1;
    }
})

console.log(hasTwo * hasThree);

function countLetters(data, num) {
    let letters = data.split('');
    let map = {};

    letters.forEach(letter => {
        if (!map[letter]) {
            map[letter] = 0;
        }

        map[letter] += 1;
    })

    for (let key in map) {
        if (map[key] === num) {
            return true;
        }
    }

    return false;
}