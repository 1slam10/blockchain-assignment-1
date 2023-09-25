const SHA256 = require('crypto-js/sha256');
const Block = require('./block.model');


class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
        this.pendingTransactions
        this.difficulty = 15
    }

    createGenesisBlock() {
        return new Block(Date.now(), "Genesis block", 0)
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
}