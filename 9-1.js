class Queue {
    constructor(v1, v2) {
        this.items = [];
        this.currentItem = null;
        this.firstItem = null;

        this.len = 2;

        let item1 = new QueueItem(v1, 0);
        let item2 = new QueueItem(v2, 1);

        item1.next = item2;
        item1.prev = item2;

        item2.next = item1;
        item2.prev = item2;

        this.items.push(item1, item2);
        this.currentItem = item2;
        this.firstItem = item1;
    }

    addItem(value) {
        let newItem = new QueueItem(value, this.len);

        newItem.prev = this.currentItem;
        newItem.next = this.currentItem.next;
        newItem.next.prev = newItem;

        this.currentItem.next = newItem;

        this.currentItem = newItem;
        this.items.push(newItem);

        this.len += 1;
    }

    removeItem() {
        if (this.firstItem === this.currentItem) {
            this.firstItem = this.currentItem.next;
        }

        this.currentItem.prev.next = this.currentItem.next;
        this.currentItem.next.prev = this.currentItem.prev;

        this.currentItem = this.currentItem.next;

        this.len -= 1;
    }

    rotate(amount) {
        if (amount < 0) {
            amount = Math.abs(amount);
            for (let i = 0; i < amount; i++) {
                this.currentItem = this.currentItem.prev;
            }
        } else {
            for (let i = 0; i < amount; i++) {
                this.currentItem = this.currentItem.next;
            }
        }

    }

    getItem() {
        return this.currentItem.value;
    }

    toString() {
        let outArray = [];
        let outItem = this.firstItem;

        for (let i = 0; i < this.len; i++) {
            if (outItem === this.currentItem) {
                outArray.push(`\x1b[1m(${outItem.value})\x1b[0m`)
            } else {
                outArray.push(outItem.value);
            }
            outItem = outItem.next;
        }

        console.log(outArray.join(' '));
    }
}

class QueueItem {
    constructor(value, index) {
        this.value = value;
        this.index = index;
    }
}

const PLAYERS = 478;
const NUM_MARBLES = 7124000;

let currentPlayer = 1;
let players = new Array(PLAYERS).fill(0);

let queue = new Queue(0, 1);

for (let i = 2; i < NUM_MARBLES; i++) {
    currentPlayer += 1;
    if (currentPlayer > PLAYERS) {
        currentPlayer = 1;
    }

    if (i % 23 === 0) {
        players[currentPlayer] += i;

        queue.rotate(-7);
        players[currentPlayer] += queue.getItem();
        queue.removeItem();
    } else {
        queue.rotate(1);
        queue.addItem(i);
    }
}

players = players.sort((a, b) => { return b - a });

console.log(players[0]);
