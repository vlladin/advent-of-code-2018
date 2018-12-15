let scoreboard = [3, 7];

let elf1 = 0;
let elf2 = 1;

const INPUT = "165061";
let index = -1;

let buffer = "37";
let found = false;

function makeRecipe() {
    let elf1Score = scoreboard[elf1];
    let elf2Score = scoreboard[elf2];

    let newScores = (elf1Score + elf2Score).toString();

    buffer += newScores;

    newScores.split('').map(char => parseInt(char)).forEach(i => [
        scoreboard.push(i)
    ]);


    index = buffer.indexOf(INPUT);
    buffer = buffer.slice(-7);


    if (index > -1) {
        found = true;
    }

    elf1 = getIndex(elf1Score + 1 + elf1);
    elf2 = getIndex(elf2Score + 1 + elf2);


}

function getIndex(value) {
    if (value < scoreboard.length) {
        return value;
    } else {
        return (value) % (scoreboard.length);
    }
}

while (!found) {
    makeRecipe();
}

console.log("Part2", scoreboard.join('').indexOf(INPUT));
