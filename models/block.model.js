const SHA256 = require('crypto-js/sha256');
const MerkleTree = require('./merkletree.model')

class Block {
    constructor(timestamp, transactionData, previousBlockHash = null) {
        this.timestamp = timestamp;
        this.transactionData = transactionData;
        this.previousBlockHash = previousBlockHash;
        this.hash = null;
        this.rootHash = null;
        this.nonce = 0;
    }

    show() {
        console.log("-------------------------");
        console.log("Hash: " + this.hash);
        console.log("Previous block hash: " + this.previousBlockHash);
        console.log("Root hash: " + this.rootHash);
        console.log("Nonce: " + this.nonce)
        console.log("Number of transactions: " + (this.previousBlockHash ? this.transactionData.length : 0));
    }
}

module.exports = Block;