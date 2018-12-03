const fs = require('fs');

const data = fs.readFileSync('3.in').toString();
let cuts = data.split('\n');

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

let rectangles = cuts.map(cut => {
    return {
        id: cut.id,
        top: cut.y,
        bottom: cut.y + cut.h - 1,
        left: cut.x,
        right: cut.x + cut.w - 1
    }
})

for (let i = 0; i < rectangles.length; i++) {
    for (let j = i + 1; j < rectangles.length; j++) {
        if (intersectRect(rectangles[i], rectangles[j])) {
            rectangles[i].intersected = true;
            rectangles[j].intersected = true;
        }
    }
}

for (let i = 0; i < rectangles.length; i++) {
    if (!rectangles[i].intersected) {
        console.log(rectangles[i]);
    }
}

function intersectRect(r1, r2) {
    return !(r2.left > r1.right ||
        r2.right < r1.left ||
        r2.top > r1.bottom ||
        r2.bottom < r1.top);
}