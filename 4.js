const fs = require('fs');

const data = fs.readFileSync('4.in').toString();

let logs = data.split('\n');

let guards = {};
let currentGuard;

// parse the input
logs = logs.map(log => {
    let parts = log.split(/[\[\]]+/);
    let time = parts[1];
    let logEntry = parts[2].substr(1);
    let minute = parseInt(time.split(' ')[1].split(':')[1]);

    let sortableTime =
        parseInt(time
            .replace(/\-/g, '')
            .replace(/\s/g, '')
            .replace(/:/g, ''));

    return {
        minute: minute,
        time: time,
        sortableTime: sortableTime,
        logEntry: logEntry
    }
});

// sort by time
logs = logs.sort((a, b) => {
    return a.sortableTime - b.sortableTime
})

// determine how much a guard slept between a "falls asleep" and a "wakes up"
logs.forEach(log => {
    let logEntry = log.logEntry;

    if (logEntry.indexOf('Guard') > -1) {
        let guardId = getGuardId(logEntry);

        if (!guards[guardId]) {
            currentGuard = {
                id: guardId,
                minutesAsleep: 0,
                mostSleptMinute: -1,
                minuteMap: {}
            };

            guards[guardId] = currentGuard;
        } else {
            currentGuard = guards[guardId];
        }
    }

    if (logEntry === 'falls asleep') {
        currentGuard.sleepsAt = log.minute;
    }

    if (logEntry === 'wakes up') {
        currentGuard.minutesAsleep += (log.minute - currentGuard.sleepsAt);
        for (let i = currentGuard.sleepsAt; i < log.minute; i++) {
            if (!currentGuard.minuteMap[i.toString()]) {
                currentGuard.minuteMap[i.toString()] = { minute: i, times: 0 };
            }

            currentGuard.minuteMap[i.toString()].times += 1;
        }
    }
})

guards = objectToArray(guards);

// determine the most slept minute for a guard
guards = guards.map(guard => {
    let minutes = objectToArray(guard.minuteMap);

    minutes = minutes.sort((a, b) => {
        return b.times - a.times;
    })

    if (minutes.length !== 0) {
        guard.mostSleptMinute = minutes[0].minute;
    }

    return guard;
})

guards = guards.sort((a, b) => {
    return b.minutesAsleep - a.minutesAsleep;
})

let mostSleepyGuard = guards[0];

console.log("Part 1:", mostSleepyGuard.mostSleptMinute * mostSleepyGuard.id);

let globalMinuteMap = {};

// for each minute in a hour, loop through all guards and find the max amount for that minute
for (let i = 0; i <= 59; i++) {
    let globalMinute = { amount: 0, guardId: 0, minute: i }
    globalMinuteMap[i] = globalMinute;

    for (let j = 0; j < guards.length; j++) {
        if (guards[j].minuteMap[i.toString()] && guards[j].minuteMap[i.toString()].times > globalMinute.amount) {
            globalMinute.amount = guards[j].minuteMap[i.toString()].times;
            globalMinute.guardId = guards[j].id;
        }
    }
}

globalMinuteMap = objectToArray(globalMinuteMap);

globalMinuteMap = globalMinuteMap.sort((a, b) => {
    return b.amount - a.amount;
})

let mostSleptMinute = globalMinuteMap[0];
console.log("Part 2: ", mostSleptMinute.minute * mostSleptMinute.guardId);

function getGuardId(logEntry) {
    return parseInt(logEntry.split(' ')[1].substr(1));
}

function objectToArray(data) {
    let returnData = [];

    for (let key in data) {
        returnData.push(data[key]);
    }

    return returnData;
}