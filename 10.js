const fs = require('fs');

let data = fs.readFileSync('10.in').toString().split('\n');

const LINE_HEIGHT = 10;
const LINE_PADDING = 3;

let currentSecond = 0;

data = data.map(item => {
    let vector = item.match(/<([^>]+)>/gm);

    let position = vector[0]
        .toString()
        .replace('<', '')
        .replace('>', '')
        .replace(/\s+/g, '')
        .split(',');

    let direction = vector[1]
        .toString()
        .replace('<', '')
        .replace('>', '')
        .replace(/\s+/g, '')
        .split(',');

    return {
        x: parseInt(position[0]),
        y: parseInt(position[1]),
        vx: parseInt(direction[0]),
        vy: parseInt(direction[1])
    }
})


tick()

function move() {
    currentSecond += 1;
    data.forEach(point => {
        point.x += point.vx;
        point.y += point.vy;
    })
}

function tick() {
    move();
    outPoints();
    setTimeout(tick, 1);
}

function outPoints() {

    let viewport = getViewPortBounds();
    if (viewport.maxY - viewport.minY !== LINE_HEIGHT + (2 * LINE_PADDING) - 1) {
        return;
    }

    for (let i = viewport.minY; i <= viewport.maxY; i++) {
        let row = '';
        for (let j = viewport.minX; j <= viewport.maxX; j++) {
            if (getPointAt(j, i)) {
                row += '#';
            } else {
                row += '.';
            }
        }

        console.log(row);
    }

    console.log(`\nSeconds: ${currentSecond}`);
    process.exit(0);
}

function getViewPortBounds() {
    let minX = Number.MAX_VALUE;
    let maxX = Number.MIN_VALUE;

    let minY = Number.MAX_VALUE;
    let maxY = Number.MIN_VALUE;

    data.forEach(item => {
        if (item.x < minX) {
            minX = item.x;
        }
        if (item.x > maxX) {
            maxX = item.x;
        }
        if (item.y < minY) {
            minY = item.y;
        }
        if (item.y > maxY) {
            maxY = item.y;
        }
    })

    return { minX: minX - LINE_PADDING, maxX: maxX + LINE_PADDING, minY: minY - LINE_PADDING, maxY: maxY + LINE_PADDING };
}

function getPointAt(x, y) {
    return data.filter(item => item.x === x && item.y === y)[0];
}
