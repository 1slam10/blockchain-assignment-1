const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, transactionData, previousBlock = null) {
        this.timestamp = timestamp;
        this.transactionData = transactionData;
        this.previousBlock = previousBlock;
        this.previousBlockHash = getPreviousBlockHash();
        this.hash = calculateHash();
        this.nonce = 0;
    }

    calculateHash() {

        let blockContent = {
            "transactionData": this.transactionData,
            "timestamp": this.timestamp,
            "previousBlockHash": this.previousBlockHash
        }
    
        let jsonObject = JSON.stringify(blockContent, null, 2)

        return SHA256(Buffer.from(jsonObject, 'utf-8')).toString();
    }

    getPreviousBlockHash() {
        previousBlockHash = ""
        if (this.previousBlock) {
            previousBlockHash = this.previousBlock.hash;
        }
        return previous_block_cryptographic_hash
    }
}

module.exports = Block;