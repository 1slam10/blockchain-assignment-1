const SHA256 = require('crypto-js/sha256')
const crypto = require('crypto');

class Transaction {
    constructor(owner, receiverAddress, amount) {
        this.owner = owner;
        this.receiver = receiverAddress;
        this.amount = amount;
        this.signature = this.sign();
    }

    sendToNodes() {
        return {
            "sender_address": this.owner.walletAddress,
            "receiver_address": this.receiverAddress,
            "amount": this.amount,
            "signature": this.signature
        }
    }

    sign() {
        const transactionData = this.generateData();
        const hashObject = SHA256(transactionData).toString();

        const privateKeyBuffer = Buffer.from(this.privateKey, 'hex');

        const signer = crypto.createSign('RSA-SHA256');

        signer.update(privateKeyBuffer);
        signer.update(hashObject);

        const signature = signer.sign();

        return signature.toString('hex');
    }

    //returns ransaction in byte format
    generateData() {
        let transactionData = {
            "sender": String(this.owner.walletAddress),
            "receiver": String(this.receiver),
            "amount": String(this.amount)
        }

        const jsonString = JSON.stringify(transactionData);
        const textEncoder = new TextEncoder();
        const bytes = textEncoder.encode(jsonString);

        // Returning the byte array
        return bytes;
    }

}

module.exports = Transaction