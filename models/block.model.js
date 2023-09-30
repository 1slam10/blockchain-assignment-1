const colors = require('colors');

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
        console.log("Hash: " + colors.green(this.hash));
        console.log("Previous block hash: " + colors.green(this.previousBlockHash));
        console.log("Root hash: " + colors.green(this.rootHash));
        console.log("Nonce: " + colors.yellow(this.nonce));
        console.log("Number of transactions: " + (this.previousBlockHash ? this.transactionData.length : 0));
    }
}

module.exports = Block;