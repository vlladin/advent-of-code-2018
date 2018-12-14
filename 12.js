const fs = require('fs');
const data = fs.readFileSync('12.in').toString().split('\n');

let state = data[0].split('initial state: ')[1];
let nextState = "";

let indexShift = 0;
let sum = 0;
let rules = {};

data.shift();
data.shift();

data.forEach(rule => {
    let parts = rule.split(' => ');
    rules[parts[0]] = parts[1];
})

function prependPots() {
    state = `...${state}`;
    indexShift += 3;
}

function appendPots() {
    state = `${state}...`;
}

prependPots();
appendPots();

function nextGeneration() {
    nextState = "..";

    if (state.substr(0, 3) !== '...') {
        prependPots();
    }

    if (state.substr(state.length - 3, 3) !== '...') {
        appendPots();
    }

    for (i = 2; i <= state.length - 3; i++) {
        let partition = state.substr(i - 2, 5);
        if (rules[partition]) {
            nextState += rules[partition];
        } else {
            nextState += '.';
        }
    }
    nextState += "..";
    state = nextState;
}

for (let i = 0; i < 20; i++) {
    nextGeneration();
}

for (let i = 0; i < state.length; i++) {
    if (state[i] === '#') {
        sum += (i - indexShift);
    }
}

console.log("Part 1:", sum);

//for part 2, deduce with your brain that there is a pattern in the results

/**
 * output every thousand generation and see that the number looks like:
 * xx113
 * yy113
 * ...
 *
 * So the formula is:
 * 75 * (x-1) + 76  where x is the thousand generation you need
 *
 * For 10 thousands,
 * 75 * (10 - 1) + 76
 *
 * For the answer, 75 * 49999999 + 76 + append the 113 to the result (append not add)
 * */