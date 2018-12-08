const fs = require('fs');

const data = fs.readFileSync('8.in').toString().split(' ');

let nodeIndex = 0;

let totalMeta = 0;

class Node {
    constructor(data) {
        this.index = ++nodeIndex;
        this.numChildren = parseInt(data[0]);
        this.numMeta = parseInt(data[1]);
        this.children = [];
        this.meta = [];
        this.value = 0;

        if (this.numChildren === 0) {
            this.meta = data.splice(2, this.numMeta);
            addMeta(this.meta);
        } else {
            for (let i = 1; i <= this.numChildren; i++) {
                data.shift();
                data.shift();

                let newNode = new Node(data);
                this.children.push(newNode);
            }

            this.meta = data.splice(2, this.numMeta);

            addMeta(this.meta);
        }
    }

    toString() {
        console.log(JSON.stringify({
            id: this.index,
            numChildren: this.numChildren,
            numMeta: this.numMeta,
            children: this.children,
            meta: this.meta
        }, null, 4))
    }
}

let rootNode = new Node(data);

function addMeta(meta) {
    meta.forEach(value => {
        totalMeta += parseInt(value);
    })
}

rootNode.toString();
console.log({ totalMeta })