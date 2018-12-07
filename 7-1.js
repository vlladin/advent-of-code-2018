const fs = require('fs');

const data = fs.readFileSync('7.in').toString();

let lines = data.split('\n');
let stepsMap = {};
let steps = [];
let totalTime = -1;

const STEP_BASE_TIME = 60;
const WORKERS = 5;

const STEP_EXEC_TIME = 0;

let busyWorkers = 0;

parseSteps();

tick();

function tick() {
    totalTime += 1;

    steps.forEach(step => {
        if (step.inProgress) {
            step.workTime -= 1;
            if (step.workTime === 0) {
                step.finished = true;
                busyWorkers -= 1;

                steps.forEach(s => {
                    s.prereq = s.prereq.filter(pr => pr !== step.step);
                })
            }
        }
    });

    let availableWorkers = WORKERS - busyWorkers;

    for (let i = 0; i < availableWorkers; i++) {
        if (hasAvailableTask() && availableWorkers > 0) {
            busyWorkers += 1;
            let nextTask = getNextTask();
            nextTask.inProgress = true;
        }
    }

    outTasksInProgress();

    if (!finishedAllSteps()) {
        setTimeout(tick, STEP_EXEC_TIME);
    }
}

function getNextTask() {
    let nextTask = steps.filter(step => step.prereq.length === 0 && step.inProgress === false && step.finished === false)[0];
    return nextTask;
}

function hasAvailableTask() {
    return steps.filter(step => step.prereq.length === 0 && step.inProgress === false && step.finished === false).length > 0;
}

function outTasksInProgress() {
    console.log(totalTime, steps.filter(step => step.inProgress === true && step.finished === false).map(item => `${item.step}`));
}

function finishedAllSteps() {
    return steps.filter(step => step.finished === false).length === 0;
}

function parseSteps() {
    lines.forEach(line => {
        let parts = line.split(' ');
        let prereq = parts[1];
        let step = parts[7];

        if (!stepsMap[step]) {
            stepsMap[step] = [];
        }

        if (!stepsMap[prereq]) {
            stepsMap[prereq] = [];
        }

        stepsMap[step].push(prereq);
    })

    for (let key in stepsMap) {
        let step = stepsMap[key];

        step = step.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));

        steps.push({
            step: key,
            prereq: step,
            workTime: STEP_BASE_TIME + (key.charCodeAt(0) - 64),
            inProgress: false,
            finished: false
        })
    }
    steps = steps.sort((a, b) => {
        return a.step.charCodeAt(0) - b.step.charCodeAt(0)
    });
}
