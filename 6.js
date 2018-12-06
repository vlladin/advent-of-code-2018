const fs = require('fs');

const data = fs.readFileSync('6.in').toString();

let maxX = 0;
let maxY = 0;
let pointId = 0;

let points = data.split('\n').map(item => {
    const parts = item.split(', ');
    const x = parseInt(parts[0]);
    const y = parseInt(parts[1]);

    pointId += 1;

    if (x > maxX) {
        maxX = x;
    }

    if (x > maxY) {
        maxY = y;
    }

    return {
        id: pointId,
        x: x,
        y: y
    }
})

if (maxX > maxY) {
    maxY = maxX
} else {
    maxX = maxY;
}

let board = [];
for (let i = 0; i <= maxY; i++) {
    let row = [];
    for (let j = 0; j <= maxX; j++) {
        row.push({ isPoint: false, closestPoint: 0, id: 0, x: j, y: i, minDistance: Number.MAX_VALUE });
    }
    board.push(row);
    row = [];
}

points.forEach(point => {
    board[point.y][point.x].isPoint = true;
    board[point.y][point.x].id = point.id;
    board[point.y][point.x].closestPoint = point.id;
})

for (let i = 0; i <= maxY; i++) {
    for (let j = 0; j <= maxX; j++) {
        let boardPoint = board[i][j];

        if (boardPoint.isPoint) {
            continue;
        }

        points.forEach(point => {
            let distance = getDistance(point, boardPoint);

            if (distance < boardPoint.minDistance) {
                boardPoint.minDistance = distance;
                boardPoint.closestPoint = point.id;
            }
            else
                if (distance === boardPoint.minDistance) {
                    boardPoint.minDistance = distance;
                    boardPoint.closestPoint = 0;
                }
        })


    }
}

//now we invalidate the points that have location touching the margins of the grid (they are infinite in area)

//x: 0, y->
//x:MAX, y->

//y:0, x->
//y:max, x->

let offendingIds = [];
let pointMap = {};

// outBoard();

//top
for (let i = 0; i <= maxX; i++) {
    let boardPoint = board[0][i];
    offendingIds.push(boardPoint.closestPoint);
}

//bottom
for (let i = 0; i <= maxX; i++) {
    let boardPoint = board[maxY][i];
    offendingIds.push(boardPoint.closestPoint);
}

//left
for (let i = 0; i <= maxY; i++) {
    let boardPoint = board[i][0];
    offendingIds.push(boardPoint.closestPoint);
}

//right
for (let i = 0; i <= maxY; i++) {
    let boardPoint = board[i][maxX];
    offendingIds.push(boardPoint.closestPoint);
}

for (let i = 0; i <= maxY; i++) {
    for (let j = 0; j <= maxX; j++) {
        let boardPoint = board[i][j];
        if (offendingIds.indexOf(boardPoint.closestPoint) > -1) {
            boardPoint.closestPoint = 0;
            boardPoint.isPoint = false;
        } else {
            if (!pointMap[boardPoint.closestPoint]) {
                pointMap[boardPoint.closestPoint] = 0;
            }

            pointMap[boardPoint.closestPoint] += 1;
        }
    }
}

console.log("----------------------------")
// outBoard();

let pointAmount = [];
for (let pointId in pointMap) {
    pointAmount.push({
        id: pointId,
        amount: pointMap[pointId]
    })
}

pointAmount = pointAmount.sort((a, b) => b.amount - a.amount);

console.log("PART 1:", pointAmount[0]);

function getDistance(p1, p2) {
    return Math.abs((Math.abs(p2.x - p1.x)) + Math.abs((p2.y - p1.y)));
}

function outBoard() {
    board.forEach(row => {
        console.log(row.map(item => ` ${item.isPoint ? "P" + item.id : " " + item.closestPoint} `).join('') + "\n");
    })
}