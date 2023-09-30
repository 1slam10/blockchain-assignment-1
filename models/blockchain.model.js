const SHA256 = require('crypto-js/sha256');
const Block = require('./block.model');


class Blockchain {
    constructor() {
        this.chain = [];
        this.difficulty = 2;
    }

    add(block) {
        this.chain.push(block);
    }

    lastBlockHash() {
        return this.chain[this.chain.length - 1].hash;
    }

    show() {
        for(let block of this.chain) {
            block.show()
        }
    }
}

module.exports = Blockchain