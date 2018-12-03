const fs = require('fs');

const data = fs.readFileSync('3.in').toString();
let cuts = data.split('\n');

let fabricMap = {};
let overlapCounter = 0;

cuts = cuts.map(cut => {
    let parts = cut.split(/[\s,#@:x]+/);
    return {
        id: parseInt(parts[1]),
        x: parseInt(parts[2]),
        y: parseInt(parts[3]),
        w: parseInt(parts[4]),
        h: parseInt(parts[5])
    }
})

cuts.forEach(cut => {
    for (let i = 0; i < cut.w; i++) {
        for (let j = 0; j < cut.h; j++) {
            let cx = i + cut.x;
            let cy = j + cut.y;

            if (fabricMap[`${cx}.${cy}`] === undefined) {
                fabricMap[`${cx}.${cy}`] = 0;
            } else {
                fabricMap[`${cx}.${cy}`] += 1;
            }
        }
    }
})

for (let key in fabricMap) {
    if (fabricMap[key] > 0) {
        overlapCounter += 1;
    }
}

console.log(overlapCounter)