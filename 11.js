const GRID_SERIAL_NUMBER = 9306;

let cells = {};
let powerGridMap = {};
let powerGrid = [];

for (let i = 1; i <= 300; i++) {
    for (let j = 1; j <= 300; j++) {
        let cell = {
            x: j,
            y: i
        }

        cell.rackId = cell.x + 10;
        cell.powerLevel = cell.rackId * cell.y;
        cell.powerLevel += GRID_SERIAL_NUMBER;
        cell.powerLevel *= cell.rackId;

        let newPowerLevel = cell.powerLevel.toString()[cell.powerLevel.toString().length - 3];
        if (newPowerLevel) {
            newPowerLevel = parseInt(newPowerLevel);
        } else {
            newPowerLevel = 0;
        }

        cell.powerLevel = newPowerLevel - 5;

        cells[`${cell.x}.${cell.y}`] = cell;
    }
}


function calculateGridPower(size) {
    for (let i = 1; i <= 300 - size - 1; i++) {
        for (let j = 1; j < 300 - size - 1; j++) {
            let gridPower = computeGridPower(j, i, size);
            powerGridMap[`${j}.${i}.${size}`] = gridPower;
        }
    }

    function computeGridPower(x, y, size) {
        let gridPower = powerGridMap[`${x}.${y}.${size - 1}`];

        if (!gridPower) {
            gridPower = 0;

            for (let j = y; j < y + size; j++) {
                for (let i = x; i < x + size; i++) {
                    gridPower += cells[`${i}.${j}`].powerLevel;
                }
            }
        } else {
            //horiz till the end
            for (let i = x; i < x + size; i++) {
                gridPower += cells[`${i}.${y + size - 1}`].powerLevel;
            }

            for (let j = y; j < y + size - 1; j++) {
                gridPower += cells[`${x + size - 1}.${j}`].powerLevel;
            }
        }

        return gridPower;
    }
}

//part 1:
// calculateGridPower(3);

//part 2:
for (let i = 1; i < 300; i++) {
    calculateGridPower(i);
}

//calculate for 300.300.300
let totalGridPower = 0;
for (let j = 1; j <= 300; j++) {
    for (let i = 1; i <= 300; i++) {
        totalGridPower += cells[`${i}.${j}`].powerLevel;
    }
}
powerGridMap[`300.300.300`] = totalGridPower;

for (let key in powerGridMap) {
    powerGrid.push({ id: key, value: powerGridMap[key] });
}

powerGrid = powerGrid.sort((a, b) => b.value - a.value);
console.log(powerGrid[0])