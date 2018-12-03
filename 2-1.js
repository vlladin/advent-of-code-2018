const fs = require('fs');

const data = fs.readFileSync('2.in').toString();
const boxes = data.split('\n');

for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
        let diff = stringDiff(boxes[i], boxes[j]);

        if (diff === 1) {
            return output(boxes[i], boxes[j]);
        }
    }
}

function output(str1, str2) {
    let out = "";
    let s1 = str1.split('');
    let s2 = str2.split('');

    for (var i = 0; i < s1.length; i++) {
        if (s1[i] === s2[i]) {
            out += s1[i];
        }
    }

    console.log(out);
}

function stringDiff(str1, str2) {
    let diff = 0;
    let s1 = str1.split('');
    let s2 = str2.split('');

    for (var i = 0; i < s1.length; i++) {
        if (s1[i] !== s2[i]) {
            diff += 1;
        }
    }

    return diff;
}