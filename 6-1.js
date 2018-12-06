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

let allBoardPoints = [];

for (let i = 0; i <= maxY; i++) {
    for (let j = 0; j <= maxX; j++) {
        let boardPoint = board[i][j];

        allBoardPoints.push(boardPoint);

        if (boardPoint.isPoint) {
            continue;
        }

        let totalDistance = 0;

        points.forEach(point => {
            let distance = getDistance(point, boardPoint);
            totalDistance += distance;

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

        boardPoint.totalDistance = totalDistance;
    }
}


function getDistance(p1, p2) {
    return Math.abs((Math.abs(p2.x - p1.x)) + Math.abs((p2.y - p1.y)));
}

// outBoard()

function outBoard() {
    board.forEach(row => {
        console.log(row.map(item => ` ${item.isPoint ? "P" + item.id : " " + item.closestPoint} `).join('') + "\n");
    })
}

let threshold = 10000;
let desiredRegion = allBoardPoints.filter(point => point.totalDistance < threshold);

let pointsWithinRegion = 0;

for (let i = 0; i <= maxY; i++) {
    let startX = -1;
    let stopX = 0;
    let currentY = i;

    for (let j = 0; j <= maxX; j++) {
        // console.log(i, j)
        let boardPoint = board[i][j];

        if (desiredRegion.indexOf(boardPoint) > -1) {
            if (startX === -1) {
                startX = boardPoint.x;
            }

            stopX = boardPoint.x;
        }
    }

    if (startX > -1) {
        pointsWithinRegion += getPointsWithinHorizontalBounds(startX, stopX, currentY);
    }
}

function getPointsWithinHorizontalBounds(x1, x2, y) {
    return points.filter(point => point.x >= x1 && point.x <= x2 && point.y === y).length;
}

console.log("Part 2:", desiredRegion.length + pointsWithinRegion);