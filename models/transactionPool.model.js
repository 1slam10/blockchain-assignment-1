const SHA256 = require('crypto-js/sha256');
const crypto = require('crypto');

class TransactionPool {
    constructor() {
        this.transactions = [];
        this.pendingTransactions = [];
    }

    add(transaction) {
        console.log("Verifying new transacation...");

        const transactionData = transaction.getTransactionData()
        const hasFunds = this.validateFunds(transactionData['sender_address'], Number(transactionData['amount']));

        if (!hasFunds) {
            console.log("You have not enough funds, unable to make a transaction. Aborting...");
            return;
        }

        const isValidSign = this.validateSignature(transaction.wallet.publicKey, transactionData.signature, transaction.generateData());

        if (!isValidSign) {
            console.log("Transaction signature is not correct, unable to make a transaction. Aborting...");
        }
        this.transactions.push(transaction);
        this.pendingTransactions.push(transaction);
        console.log("Transaction created successfully!");
    }
    
    validateSignature(publicKey, signature, transactionData) {
        //const signatureBuffer = Buffer.from(signature, 'hex');
        console.log("Validation of transaction signature...")

        //console.log(signatureBuffer)
        console.log(signature)

        const verifier = crypto.createVerify('RSA-SHA256');

        const hashObject = SHA256(transactionData).toString();

        verifier.update(hashObject);
        verifier.end();

        const isValid = verifier.verify(publicKey, signature);

        // Return the result.
        return isValid;
    }

    validateFunds(senderAddress, amount) {
        let senderBalance = 1000;
        
        for (let transaction of this.transactions) {
            const transactionData = transaction.getTransactionData()

            if (transactionData['sender_address'] === senderAddress) {
                senderBalance -= transactionData.amount
            }

            if (transactionData['receiver_address'] === senderAddress) {
                senderBalance += transactionData.amount
            }
        }

        if (senderBalance >= amount) {
            return true;
        }
        return false;
    }

    getFunds(senderAddress) {
        let senderBalance = 1000;

        for (let transaction of this.transactions) {
            const transactionData = transaction.getTransactionData()

            if (transactionData['sender_address'] === senderAddress) {
                senderBalance -= transactionData.amount
            }

            if (transactionData['receiver_address'] === senderAddress) {
                senderBalance += transactionData.amount
            }
        }

        return senderBalance
    }

    prepareForMining() {
        let transactions = [];

        for (let transaction of this.pendingTransactions) {
            transactions.push(transaction.getTransactionData())
        }

        this.pendingTransactions = [];

        return transactions;
    }

    showTransactionsHistory() {
        if (this.transactions.length < 1) {
            console.log("There is no transactions :(")
        }
        for (let transaction of this.transactions) {
            transaction.show();
        }
    }

    showPending() {
        if (this.transactions.length < 1) {
            console.log("There is no pending transactions :(")
        }
        for (let transaction of this.pendingTransactions) {
            transaction.show();
        }
    }
}

module.exports = TransactionPool;