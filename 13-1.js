const fs = require('fs');
const data = fs.readFileSync('13.in').toString();

let board = {};
let carts = [];
carts.getAt = function (x, y) {
    return this.filter(item => item.x === x && item.y === y)[0]
}

let crashCoordinates;
let removeIds = [];
const cartSymbols = ['>', '<', 'v', '^'];

let cartId = 0;

class Cart {
    constructor(x, y, value) {
        this.id = cartId;
        cartId += 1;
        this.x = x;
        this.y = y;
        this.d = -1;
        this.next = 'left';
        this.value = value;

        switch (value) {
            case '>':
                this.d = 1;
                break;
            case '<':
                this.d = 3;
                break;
            case 'v':
                this.d = 2;
                break;
            case '^':
                this.d = 4;
                break;
        }
    }

    nextDirection() {
        if (this.next === 'left') {
            this.next = 'straight';

            if (this.d === 1) this.d = 4;
            else if (this.d === 2) this.d = 1;
            else if (this.d === 3) this.d = 2;
            else if (this.d === 4) this.d = 3;

        } else if (this.next === 'straight') {
            this.next = 'right';

        } else {
            if (this.next === 'right') {
                this.next = 'left';

                if (this.d === 1) this.d = 2;
                else if (this.d === 2) this.d = 3;
                else if (this.d === 3) this.d = 4;
                else if (this.d === 4) this.d = 1;
            }
        }
    }

    setDirection(symbol) {
        if (symbol === '\\') {
            if (this.d === 1) this.d = 2;
            else if (this.d === 2) this.d = 1;
            else if (this.d === 3) this.d = 4;
            else if (this.d === 4) this.d = 3;
        } else if (symbol === '/') {
            if (this.d === 1) this.d = 4;
            else if (this.d === 2) this.d = 3;
            else if (this.d === 3) this.d = 2;
            else if (this.d === 4) this.d = 1;
        }
    }

    text() {
        if (this.d === 1) return '>';
        else if (this.d === 2) return 'v';
        else if (this.d === 3) return '<';
        else if (this.d === 4) return '^';
    }
}

let lines = data.split('\n');
let maxX = 0;
let maxY = lines.length;

for (let y = 0; y < lines.length; y++) {
    let line = lines[y].split('');

    for (let x = 0; x < line.length; x++) {
        if (x > maxX) maxX = x;

        if (cartSymbols.indexOf(line[x]) > -1) {
            carts.push(new Cart(x, y, line[x]))
            setTile(x, y, '?');
        } else {
            setTile(x, y, line[x]);
        }
    }
}

for (let coord in board) {
    let x = parseInt(coord.split(',')[0]);
    let y = parseInt(coord.split(',')[1]);
    let symbol = getTile(x, y);

    if (symbol === '?') {
        if (hMovement(getTile(x - 1, y)) && hMovement(getTile(x + 1, y))) {
            setTile(x, y, '-');
        }
        if (vMovement(getTile(x, y + 1)) && vMovement(getTile(x, y - 1))) {
            setTile(x, y, '|');
        }
        if (hMovement(getTile(x - 1, y)) && hMovement(getTile(x + 1, y)) && vMovement(getTile(x, y + 1)) && vMovement(getTile(x, y - 1))) {
            setTile(x, y, '+');
        }
    }

}

function outBoard() {
    for (let y = 0; y < maxY; y++) {
        let line = "";
        for (let x = 0; x <= maxX; x++) {
            let cart = getCartAt(x, y);
            if (cart) {
                line += cart.text();
                continue;
            }
            if (getTile(x, y)) {
                line += getTile(x, y);
            } else {
                line += ' ';
            }
        }
        console.log(line);
    }
    console.log(' ');
}

function tick() {
    carts = carts.sort((a, b) => {
        return a.x - b.x;
    })
    carts = carts.sort((a, b) => {
        return a.y - b.y;
    })

    carts.forEach(cart => cart.hasMoved = false);

    for (let i = 0; i < carts.length; i++) {
        if (carts.length === 1) {
            return;
        }
        // console.log(carts[i])
        moveCart(carts[i]);
    }

    // console.log(" ")
}

function moveCart(cart) {
    let direction = cart.d;
    let x = cart.x;
    let y = cart.y;
    let nextTile;
    let nextTileCart;

    switch (direction) {
        case 1:
            nextTile = getTile(x + 1, y);

            nextTileCart = getCartAt(x + 1, y);
            if (nextTileCart) removeIds.push(nextTileCart.id, cart.id);

            cart.x += 1;
            switch (nextTile) {
                case '-':
                    break;
                case '+':
                    cart.nextDirection();
                    break;
                case '/':
                case '\\':
                    cart.setDirection(nextTile);
                    break;
            }
            break;
        case 3:
            nextTile = getTile(x - 1, y)

            nextTileCart = getCartAt(x - 1, y);
            if (nextTileCart) removeIds.push(nextTileCart.id, cart.id);

            cart.x -= 1;
            switch (nextTile) {
                case '-':
                    break;
                case '+':
                    cart.nextDirection();
                    break;
                case '/':
                case '\\':
                    cart.setDirection(nextTile);
                    break;
            }
            break;
        case 2:
            nextTile = getTile(x, y + 1)

            nextTileCart = getCartAt(x, y + 1);
            if (nextTileCart) removeIds.push(nextTileCart.id, cart.id);

            cart.y += 1;
            switch (nextTile) {
                case '-':
                    break;
                case '+':
                    cart.nextDirection();
                    break;
                case '/':
                case '\\':
                    cart.setDirection(nextTile);
                    break;
            }
            break;
        case 4:
            nextTile = getTile(x, y - 1)

            nextTileCart = getCartAt(x, y - 1);
            if (nextTileCart) removeIds.push(nextTileCart.id, cart.id);

            cart.y -= 1;
            switch (nextTile) {
                case '-':
                    break;
                case '+':
                    cart.nextDirection();
                    break;
                case '/':
                case '\\':
                    cart.setDirection(nextTile);
                    break;
            }
            break;
    }
}

function getTile(x, y) {
    return board[`${x},${y}`];
}

function setTile(x, y, value) {
    return board[`${x},${y}`] = value;
}

function getCartAt(x, y) {
    for (let i = 0; i < carts.length; i++) {
        if (carts[i].x == x && carts[i].y === y) {
            return carts[i];
        }
    }
}

function hMovement(symbol) {
    return symbol !== '|' && symbol !== ' ';
}

function vMovement(symbol) {
    return symbol !== '-' && symbol !== ' ';
}

function crashCarts() {
    carts = carts.filter(cart => removeIds.indexOf(cart.id) === -1);
    removeIds = [];
}

// outBoard();
while (carts.length > 1) {
    tick();
    crashCarts();
    // outBoard();
}

console.log(`${carts[0].x},${carts[0].y}`);



