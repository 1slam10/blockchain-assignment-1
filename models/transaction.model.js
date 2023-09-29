const SHA256 = require('crypto-js/sha256')
const crypto = require('crypto');

class Transaction {
    constructor(wallet, receiverAddress, amount) {
        this.wallet = wallet;
        this.receiver = receiverAddress;
        this.amount = amount;
        this.signature = this.sign();
    }

    getTransactionData() {
        return {
            "sender_address": this.wallet.walletAddress,
            "receiver_address": this.receiverAddress,
            "amount": this.amount,
            "signature": this.signature
        }
    }

    sign() {
        const transactionData = this.generateData(); //array of bytes
        const hashObject = SHA256(transactionData).toString(); //hash

        const signer = crypto.createSign('RSA-SHA256');

        signer.update(hashObject);
        signer.end();

        const signature = signer.sign(this.wallet.privateKey);

        return Buffer.from(signature.toString('hex'), 'hex').toString('utf8');
    }

    //returns transaction in byte format
    generateData() {
        let transactionData = {
            "sender": String(this.wallet.walletAddress),
            "receiver": String(this.receiver),
            "amount": String(this.amount)
        }

        const jsonString = JSON.stringify(transactionData, 2);
        const bytes = new TextEncoder().encode(jsonString);

        return bytes;
    }
}

module.exports = Transaction