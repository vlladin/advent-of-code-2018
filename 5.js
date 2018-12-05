const fs = require('fs');

let data = fs.readFileSync('5.in').toString();
let alphabet = "abcdefghijklmnopqrstuvwxyz";

let minLen = data.length;

console.log("Part 1:", react(data));

for (let i = 0; i < alphabet.length; i++) {
    let alteredPolymer = data.replace(new RegExp(alphabet[i], "ig"), '');
    let len = react(alteredPolymer);
    if (len < minLen) {
        minLen = len;
    }
}

console.log("Part 2:", minLen);

function react(polymer) {
    let hasReacted = true;

    while (hasReacted) {
        hasReacted = false;
        if (polymer.length === 0) {
            break;
        }

        for (let i = 0; i < polymer.length - 1; i++) {
            if (areEqualDifferentCase(polymer[i], polymer[i + 1])) {
                polymer = polymer.slice(0, i) + polymer.slice(i + 2, polymer.length);

                hasReacted = true;
            }
        }
    }

    return polymer.length;
}



function areEqualDifferentCase(a, b) {
    return a.toLowerCase() === b.toLowerCase() && a !== b;
}