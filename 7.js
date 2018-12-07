const fs = require('fs');

const data = fs.readFileSync('7.in').toString();

let lines = data.split('\n');
let stepsMap = {};
let order = "";

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

    stepsMap[step].push(prereq)
})

let steps = [];
for (let key in stepsMap) {
    let step = stepsMap[key];

    step = step.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));

    steps.push({
        step: key,
        prereq: step
    })
}
steps = steps.sort((a, b) => {
    return a.step.charCodeAt(0) - b.step.charCodeAt(0)
});

getNextStep();

function getNextStep() {
    doStep(steps.filter(step => step.prereq.length === 0)[0]);
}

function doStep(step) {
    order += step.step;

    steps.forEach(s => {
        s.prereq = s.prereq.filter(pr => pr !== step.step);
    })

    steps = steps.filter(s => s.step !== step.step);

    if (steps.length) {
        setTimeout(getNextStep, 0);
    } else {
        console.log("Part 1:", order);
    }
}