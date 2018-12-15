let scoreboard = "37";

let elf1 = 0;
let elf2 = 1;

const INPUT = 165061;

function makeRecipe() {
    let elf1Score = parseInt(scoreboard[elf1]);
    let elf2Score = parseInt(scoreboard[elf2]);

    scoreboard += (elf1Score + elf2Score).toString();

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

while (true) {
    if (scoreboard.length > INPUT + 10) {
        break;
    }
    makeRecipe();

}

console.log(scoreboard.substr(INPUT, 10))
