const fs = require('fs');

const data = fs.readFileSync('./8.in').toString().split(' ');

let nodeIndex = 0;

let totalValue = 0;

class Node {
    constructor(data) {
        this.index = ++nodeIndex;
        this.numChildren = parseInt(data[0]);
        this.numMeta = parseInt(data[1]);
        this.children = [];
        this.meta = [];

        if (this.numChildren === 0) {
            this.meta = data.splice(2, this.numMeta);
            this.value = addMeta(this.meta);
        } else {
            for (let i = 1; i <= this.numChildren; i++) {
                data.shift();
                data.shift();

                let newNode = new Node(data);
                this.children.push(newNode);
            }

            this.meta = data.splice(2, this.numMeta);
            this.value = 0;

            for (let i = 0; i < this.meta.length; i++) {
                let child = this.children[parseInt(this.meta[i]) - 1];
                if (child) {
                    this.value += child.value
                }
            }
        }
    }

    toString() {
        console.log(JSON.stringify({
            id: this.index,
            numChildren: this.numChildren,
            value: this.value,
            numMeta: this.numMeta,
            children: this.children,
            meta: this.meta
        }, null, 4))
    }
}

let rootNode = new Node(data);

rootNode.meta.forEach(meta => {
    let child = rootNode.children[parseInt(meta) - 1];
    if (child) {
        totalValue += child.value;
    }
})

function addMeta(meta) {
    let total = 0;

    meta.forEach(value => {
        total += parseInt(value);
    })

    return total;
}

// rootNode.toString();

console.log({ totalValue })
