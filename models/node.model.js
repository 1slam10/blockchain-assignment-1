const SHA256 = require('crypto-js/sha256')
const crypto = require('crypto'); 

class Node {
    constructor(blockchain) {
        this.blockchain = blockchain
    }

    validateSignature(publicKey, signature, transactionData) {

        const signatureBuffer = Buffer.from(signature, 'hex');

        const verifier = crypto.createVerify('RSA-SHA256');

        verifier.update(publicKey);
        verifier.update(signatureBuffer);
        verifier.update(transactionData);

        const isValid = verifier.verify();

        // Return the result.
        return isValid;
    }

    validateFunds(senderAddress, amount) {
        let senderBalance = 0;
        let currentBlock = this.blockchain;
        while(currentBlock) {
            if(currentBlock.transactionData["sender"] == senderAddress) {
                senderBalance = senderBalance + currentBlock.transactionData["amount"];
            }
            currentBlock = currentBlock.previousBlock;
        }

        if (senderBalance >= amount) {
            return true;
        }
        return false;
    }
}

module.exports = Node;